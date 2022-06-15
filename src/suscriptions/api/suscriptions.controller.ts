import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { RegisteredSuscriptionRequest } from '../applicaction/dtos/request/registered-suscription.request.dto';
import { RegisterSuscriptionResponse } from '../applicaction/dtos/response/registered-suscription-response.dto';
import { SuscriptionApplicationService } from '../applicaction/services/suscription-application.service';
import { GetSuscriptionsQuery } from '../applicaction/queries/get-suscriptions-query';
import { GetSuscriptionByIdQuery } from '../applicaction/queries/get-suscription-by-id.query';

@Controller('suscriptions')
export class SuscriptionController {
    constructor(
       private readonly suscriptionApplicationService: SuscriptionApplicationService,
       private readonly queryBus: QueryBus
    ) {}

    @Post()
    async register(
        @Body() registeredSuscriptionRequest: RegisteredSuscriptionRequest,
        @Res({passthrough: true}) response
    ): Promise<object> {
        try{
            const result: Result<AppNotification, RegisterSuscriptionResponse> = await this.suscriptionApplicationService.open(registeredSuscriptionRequest);
            if (result.isSuccess())
            {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        }
        catch (error)
        {
            return ApiController.serverError(response, error);
        }
    }

    @Get()
    async getSuscriptions(@Res({passthrough: true}) response) : Promise<object> 
    {
        try
        {
            const customers = await this.queryBus.execute(new GetSuscriptionsQuery());
            return ApiController.ok(response, customers);
        }
        catch (error)
        {
            return ApiController.serverError(response, error);
        }
    }

    @Get('/:id')
    async getById(@Param('id') suscriptionId: number, @Res({passthrough: true}) response) : Promise<object>
    {
        try 
        {
            const customers = await this.queryBus.execute(new GetSuscriptionByIdQuery(suscriptionId));
            return ApiController.ok(response, customers);
        }
        catch(error)
        {
            return ApiController.serverError(response, error);
        }
    }
}

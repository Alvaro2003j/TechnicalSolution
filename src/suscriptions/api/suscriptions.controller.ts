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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetSuscriptionsDto } from '../applicaction/dtos/queries/get-suscriptions.dto';

@ApiBearerAuth()
@ApiTags('suscriptions')
@Controller('suscriptions')
export class SuscriptionController {
    constructor(
       private readonly suscriptionApplicationService: SuscriptionApplicationService,
       private readonly queryBus: QueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create new suscription'})
    @ApiResponse({
        status: 201,
        description: 'Suscription created',
        type: GetSuscriptionsDto,
    })
    async register(
        @Body() registeredSuscriptionRequest: RegisteredSuscriptionRequest,
        @Res({passthrough: true}) response
    ): Promise<object> {
        try{
            const result: Result<AppNotification, RegisterSuscriptionResponse> = await this.suscriptionApplicationService.register(registeredSuscriptionRequest);
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
    @ApiOperation({ summary: 'Get all suscriptions'})
    @ApiResponse({
        status: 200,
        description: 'All suscriptions returned',
        type: GetSuscriptionsDto,
        isArray: true,
    })
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
    @ApiOperation({ summary: 'Get suscription by id'})
    @ApiResponse({
        status: 200,
        description: 'Suscription returned',
        type: GetSuscriptionsDto,
    })
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

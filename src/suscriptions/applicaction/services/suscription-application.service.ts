import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterSuscriptionValidator } from '../validators/registered-suscription.validator';
import { RegisteredSuscriptionRequest } from '../dtos/request/registered-suscription.request.dto';
import { RegisterSuscriptionResponse } from '../dtos/response/registered-suscription-response.dto';
import { RegisterSuscription } from '../commands/register-suscription.command';

@Injectable()
export class SuscriptionApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerSuscriptionValidator: RegisterSuscriptionValidator,
    )
    {}

    async register(registerSuscriptionRequestDto: RegisteredSuscriptionRequest): Promise<Result<AppNotification, RegisterSuscriptionResponse>>
    {
        const notification: AppNotification = await this.registerSuscriptionValidator.validate(registerSuscriptionRequestDto);
        if (notification.hasErrors())
        {
            return Result.error(notification);
        }

        const registerSuscription: RegisterSuscription = new RegisterSuscription(
            registerSuscriptionRequestDto.typeSuscription
        );

        const suscriptionId: number = await this.commandBus.execute(registerSuscription);
        const registerSuscriptionResponse: RegisterSuscriptionResponse = new RegisterSuscriptionResponse(
            suscriptionId, 0, false, 0, registerSuscription.type
        );

        return Result.ok(registerSuscriptionResponse);
    }
}
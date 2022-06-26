import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterRequestValidator } from '../validators/registered-request.validator';
import { RegisteredRequestRequest } from '../dtos/request/registered-request.request.dto';
import { RegisterRequestResponse } from '../dtos/response/registered-request-response.dto';
import { RegisterRequest } from '../commands/open-request.command';

@Injectable()
export class RequestApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerRequestValidator: RegisterRequestValidator,
    )
    {}

    async register(registerRequestRequestDto: RegisteredRequestRequest): Promise<Result<AppNotification, RegisterRequestResponse>>
    {
        const notification: AppNotification = await this.registerRequestValidator.validate(registerRequestRequestDto);
        if (notification.hasErrors())
        {
            return Result.error(notification);
        }

        const registerRequest: RegisterRequest = new RegisterRequest(
            registerRequestRequestDto.id,
            registerRequestRequestDto.message,
            registerRequestRequestDto.date,
            registerRequestRequestDto.technicalId,
        );

        const requestId: number = await this.commandBus.execute(registerRequest);
        const registerRequestResponse: RegisterRequestResponse = new RegisterRequestResponse(
            requestId, registerRequestRequestDto.message, registerRequestRequestDto.date,registerRequestRequestDto.technicalId
        );

        return Result.ok(registerRequestResponse);
    }
}
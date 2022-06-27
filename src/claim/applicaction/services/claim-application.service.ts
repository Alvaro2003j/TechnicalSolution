import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterClaimValidator } from '../validators/registered-claim.validator';
import { RegisteredClaimRequest } from '../dtos/request/registered-claim.request.dto';
import { RegisterClaimResponse } from '../dtos/response/registered-claim-response.dto';
import { RegisterClaim } from '../commands/open-claim.command';

@Injectable()
export class ClaimApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerClaimValidator: RegisterClaimValidator,
    )
    {}

    async register(registerClaimRequestDto: RegisteredClaimRequest): Promise<Result<AppNotification, RegisterClaimResponse>>
    {
        const notification: AppNotification = await this.registerClaimValidator.validate(registerClaimRequestDto);
        if (notification.hasErrors())
        {
            return Result.error(notification);
        }

        const registerClaim: RegisterClaim = new RegisterClaim(
            registerClaimRequestDto.id,
            registerClaimRequestDto.type
        );

        const claimId: number = await this.commandBus.execute(registerClaim);
        const registerClaimResponse: RegisterClaimResponse = new RegisterClaimResponse(
            claimId, 0, registerClaim.type, 0, true
        );

        return Result.ok(registerClaimResponse);
    }
}
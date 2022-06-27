import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { ClaimTypeORM } from 'src/claim/infrastructure/persistence/typeorm/entities/claim.typeorm';
import { Repository } from 'typeorm';
import { RegisteredClaimRequest } from '../dtos/request/registered-claim.request.dto';

@Injectable()
export class RegisterClaimValidator {
    constructor(@InjectRepository(ClaimTypeORM) private claimRepository: Repository<ClaimTypeORM>) {}

    public async validate(registerClaimRequestDto: RegisteredClaimRequest) : Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const type: string = registerClaimRequestDto.type.trim();
        if (type.length <= 0) 
        {
            notification.addError('Claim type is required', null);
        }
        if (notification.hasErrors())
        {
            return notification;
        }
        const claimTypeORM = await this.claimRepository.createQueryBuilder().where("type = :type", {type}).getOne();
        if (claimTypeORM != null)
        {
            notification.addError('Claim type is taken', null)
        }
        return notification;
    }
}
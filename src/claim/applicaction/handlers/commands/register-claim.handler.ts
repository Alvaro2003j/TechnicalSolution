import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { ClaimId } from 'src/claim/domain/value-object/claim-id.value';
import { Claim } from 'src/claim/domain/entities/claim.entity';
import { ClaimFactory } from 'src/claim/domain/factories/claim.factory';
import { RegisterClaim } from '../../commands/open-claim.command';
import { ClaimTypeORM } from 'src/claim/infrastructure/persistence/typeorm/entities/claim.typeorm';
import {ClaimType } from 'src/claim/domain/value-object/claimtype.value';
import { Currency } from 'src/common/domain/enums/currency.enum';
import { ClaimMapper } from '../../mappers/claim.mapper';

@CommandHandler(RegisterClaim)
export class RegisterClaimHandler implements ICommandHandler<RegisterClaim>
{
    constructor(
        @InjectRepository(ClaimTypeORM)
        private claimRepository: Repository<ClaimTypeORM>,
        private publisher: EventPublisher,
    ) {}

    async execute(command: RegisterClaim): Promise<any> {
        let claimId: number = 0;
        const ClaimTypeResult: Result<AppNotification,ClaimType> = ClaimType.create(command.type);
        if (ClaimTypeResult.isFailure()){
            return claimId;
        }
        const cost: number = 0;
        const timeClaim: number = 0;
        const active: boolean = false
        let claim: Claim = ClaimFactory.createFrom(cost, ClaimTypeResult.value, timeClaim, active);
        let claimTypeORM: ClaimTypeORM = ClaimMapper.toTypeORM(claim);
        claimTypeORM = await this.claimRepository.save(claimTypeORM);
        if (claimTypeORM == null) { return claimId; }
        claimId = Number(claimTypeORM.id);
        claim.setId(ClaimId.of(claimId));
        claim = this.publisher.mergeObjectContext(claim);
        claim.Register();
        claim.commit();
        return claimId;
    }
}

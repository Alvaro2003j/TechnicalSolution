import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { SuscriptionId } from 'src/suscriptions/domain/value-object/suscription-id.value';
import { Suscription } from 'src/suscriptions/domain/entities/suscription.entity';
import { SuscriptionFactory } from 'src/suscriptions/domain/factories/suscription.factory';
import { RegisterSuscription } from '../../commands/register-suscription.command';
import { SuscriptionTypeORM } from 'src/suscriptions/infrastructure/persistence/typeorm/entities/suscription.typeorm';
import { SuscriptionType } from 'src/suscriptions/domain/value-object/suscriptiontype.value';

import { SuscriptionMapper } from '../../mappers/suscription.mapper';

@CommandHandler(RegisterSuscription)
export class RegisterSuscriptionHandler implements ICommandHandler<RegisterSuscription>
{
    constructor(
        @InjectRepository(SuscriptionTypeORM)
        private suscriptionRepository: Repository<SuscriptionTypeORM>,
        private publisher: EventPublisher,
    ) {}

    async execute(command: RegisterSuscription): Promise<any> {
        let suscriptionId: number = 0;
        const suscriptionTypeResult: Result<AppNotification, SuscriptionType> = SuscriptionType.create(command.type);
        if (suscriptionTypeResult.isFailure()){
            return suscriptionId;
        }
        const cost: number = 0;
        const timeSuscription: number = 0;
        const active: boolean = false
        let suscription: Suscription = SuscriptionFactory.createFrom(cost, suscriptionTypeResult.value, timeSuscription, active);
        let suscriptionTypeORM: SuscriptionTypeORM = SuscriptionMapper.toTypeORM(suscription);
        suscriptionTypeORM = await this.suscriptionRepository.save(suscriptionTypeORM);
        if (suscriptionTypeORM == null) { return suscriptionId; }
        suscriptionId = Number(suscriptionTypeORM.id);
        suscription.setId(SuscriptionId.of(suscriptionId));
        suscription = this.publisher.mergeObjectContext(suscription);
        suscription.Register();
        suscription.commit();
        return suscriptionId;
    }
}
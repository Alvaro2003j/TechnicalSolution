import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyName } from 'src/common/domain/value-objects/company-name.value';
import { Payment } from 'src/payment/domain/entities/payment.entity';
import { PaymentFactory } from 'src/payment/domain/factories/payment.factory';
import { PaymentType } from 'src/payment/domain/value-object/payment-type.value';
import { PaymentTypeORM } from 'src/payment/infrastructure/persistence/typeorm/entities/payment.typeorm';
import { SuscriptionId } from 'src/suscriptions/domain/value-object/suscription-id.value';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { RegisterPayment } from '../../commands/register-payment.command';
import { PaymentMapper } from '../../mappers/payment.mapper';

@CommandHandler(RegisterPayment)
export class RegisterPaymentHandler implements ICommandHandler<RegisterPayment>
{
    constructor(
        @InjectRepository(PaymentTypeORM)
        private registerRepository: Repository<PaymentTypeORM>,
        private publisher: EventPublisher
    ) {}

    async execute(command: RegisterPayment): Promise<any> {
        let paymentId: number = 0;
        const enterprise: string = "BCP";
        const paymentTypeResult: Result<AppNotification, PaymentType> = PaymentType.create(command.type);
        if (paymentTypeResult.isFailure()){return paymentId;}
        const suscriptionId: SuscriptionId = SuscriptionId.of(command.SuscriptionId);
        let date: string = '';
        let amount: number = 0;
        let payment: Payment = PaymentFactory.createFrom(enterprise, paymentTypeResult.value, suscriptionId, date, amount);
        let paymentTypeORM: PaymentTypeORM = PaymentMapper.toTypeORM(payment);
        paymentId = Number(paymentTypeORM.id);
        payment = this.publisher.mergeObjectContext(payment);
        payment.register();
        payment.commit();
        return paymentId;
    }
}
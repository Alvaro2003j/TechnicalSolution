import { Payment } from "src/payment/domain/entities/payment.entity";
import { PaymentTypeORM } from "src/payment/infrastructure/persistence/typeorm/entities/payment.typeorm";
import { EnterpriseTypeORM } from "src/payment/infrastructure/persistence/typeorm/value-object/enterprise.typeorm";
import { AmountTypeORM } from "src/payment/infrastructure/persistence/typeorm/value-object/payment-amount.typeorm";
import { DateTypeORM } from "src/payment/infrastructure/persistence/typeorm/value-object/payment-date.typeorm";
import { SuscribeIdTypeORM } from "src/payment/infrastructure/persistence/typeorm/value-object/suscribe-id.typeorm";

export class PaymentMapper {
    public static toTypeORM(payment: Payment): PaymentTypeORM
    {
        const paymentTypeORM: PaymentTypeORM = new PaymentTypeORM();
        paymentTypeORM.id = payment.getId() != null ? payment.getId().getValue() : 0;
        paymentTypeORM.name = payment.getEnterprise() != null ? EnterpriseTypeORM.from(payment.getEnterprise()) : null;
        paymentTypeORM.suscriptionId = payment.getSuscriptionId() != null ? SuscribeIdTypeORM.from(payment.getSuscriptionId().getValue()) : null;
        paymentTypeORM.date = payment.getDate() != null ? DateTypeORM.from(payment.getDate()) : null;
        paymentTypeORM.amount = payment.getAmount() != null ? AmountTypeORM.from(payment.getAmount()): null;
        return paymentTypeORM;
    }
}
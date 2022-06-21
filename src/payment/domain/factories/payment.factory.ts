import { CompanyName } from "src/common/domain/value-objects/company-name.value";
import { Suscription } from "src/suscriptions/domain/entities/suscription.entity";
import { Payment } from "../entities/payment.entity";
import { PaymentId } from "../value-object/payment-id.value";
import { PaymentType } from "../value-object/payment-type.value";

export class PaymentFactory {
    public static createFrom(enterprise: CompanyName, paymentType: PaymentType, suscription: Suscription, date: string, amount: number){
        return new Payment(enterprise, paymentType, suscription, date, amount);
    }
    public static withId(paymentId: PaymentId, nterprise: CompanyName, paymentType: PaymentType, suscription: Suscription, date: string, amount: number): Payment
    {
        let payment: Payment = new Payment(enterprise, paymentType, suscription, date, amount);
        payment.setId(paymentId);
        return payment;
    }
}
import { CompanyName } from "src/common/domain/value-objects/company-name.value";
import { SuscriptionId } from "src/suscriptions/domain/value-object/suscription-id.value";
import { Payment } from "../entities/payment.entity";
import { PaymentId } from "../value-object/payment-id.value";
import { PaymentType } from "../value-object/payment-type.value";

export class PaymentFactory {
    public static createFrom(enterprise: CompanyName, paymentType: PaymentType, suscriptionId: SuscriptionId, date: string, amount: number){
        return new Payment(enterprise, paymentType, suscription, date, amount);
    }
    public static withId(paymentId: PaymentId, enterprise: CompanyName, paymentType: PaymentType, suscriptionId: SuscriptionId, date: string, amount: number): Payment
    {
        let payment: Payment = new Payment(enterprise, paymentType, suscriptionId, date, amount);
        payment.setId(paymentId);
        return payment;
    }
}
import { AggregateRoot } from "@nestjs/cqrs"
import { CompanyName } from "src/common/domain/value-objects/company-name.value";
import { SuscriptionId } from "src/suscriptions/domain/value-object/suscription-id.value";
import { PaymentRegistered } from "../events/payment-registered.event";
import { PaymentId } from "../value-object/payment-id.value";
import { PaymentType } from "../value-object/payment-type.value";

export class Payment extends AggregateRoot {
    private id: PaymentId;
    private enterprise: CompanyName;
    private paymentType: PaymentType;
    private suscriptionId: SuscriptionId;
    private date: string;
    private amount: number;

    public constructor(enterprise: CompanyName, paymentType: PaymentType, suscriptionId: SuscriptionId, date: string, amount: number)
    {
        super();
        this.enterprise = enterprise;
        this.paymentType = paymentType;
        this.suscriptionId = suscriptionId;
        this.date = date;
        this.amount = amount;
    }

    public Pay()
    {
        const event = new PaymentRegistered(this.id.getValue(), this.paymentType.getType(), this.amount, this.suscriptionId.getValue());
        this.apply(event);
    }

    public getId(): PaymentId
    {
        return this.id;
    }
    public setId(id: PaymentId)
    {
        this.id = id;
    }

    public getEnterprise(): CompanyName
    {
        return this.enterprise;
    }

    public setEnterprise(enterprise: CompanyName)
    {
        this.enterprise = enterprise;
    }

    public getSuscriptionId(): SuscriptionId
    {
        return this.suscriptionId;
    }

    public setSuscriptionId(suscriptionId: SuscriptionId)
    {
        this.suscriptionId = suscriptionId;
    }

    public getDate(): string
    {
        return this.date;
    }

    public setDate(date: string)
    {
        this.date = date;
    }

    public getAmount(amount: number)
    {
        this.amount = amount;
    }

}
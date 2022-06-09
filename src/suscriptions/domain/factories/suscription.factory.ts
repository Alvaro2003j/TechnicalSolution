import { Money } from "src/common/domain/value-objects/money.value";
import { Suscription } from "../entities/suscription.entity";
import { SuscriptionId } from "../value-object/suscription-id.value";
import { SuscriptionType } from "../value-object/suscriptiontype.value";

export class SuscriptionFactory{
    public static createFrom(Cost: Money, Suscription_Type: SuscriptionType, TimeSuscription: number, Active: boolean) : Suscription
    {
        return new Suscription(Cost, Suscription_Type, TimeSuscription, Active);
    }

    public static withId(suscriptionId: SuscriptionId, cost: Money, Suscription_Type: SuscriptionType, TimeSuscription: number, active: boolean) : Suscription
    {
        let suscription: Suscription = new Suscription(cost, Suscription_Type, TimeSuscription, active);
        suscription.setId(suscriptionId);
        return suscription;
    }
}
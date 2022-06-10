import { SuscriptionTypeORM } from "src/suscriptions/infrastructure/persistence/typeorm/entities/suscription.typeorm";
import { Suscription } from "src/suscriptions/domain/entities/suscription.entity";
import { SuscriptionTypeTypeORM } from "src/suscriptions/infrastructure/persistence/typeorm/value-object/suscription-type.typeorm";
import { SuscriptionCostTypeORM } from "src/suscriptions/infrastructure/persistence/typeorm/value-object/suscription-cost.typeorm";
import { TimeSuscriptionTypeORM } from "src/suscriptions/infrastructure/persistence/typeorm/value-object/suscription-timesuscription.typeorm";
import { ActiveTypeORM } from "src/suscriptions/infrastructure/persistence/typeorm/value-object/suscription-active.typeorm";

export class SuscriptionMapper {
    public static toTypeORM(suscription: Suscription): SuscriptionTypeORM 
    {
        const suscriptionTypeORM: SuscriptionTypeORM = new SuscriptionTypeORM();
        suscriptionTypeORM.id = suscription.getId() != null ? suscription.getId().getValue() : 0;
        suscriptionTypeORM.cost = suscription.getCost() != null ? SuscriptionCostTypeORM.from(suscription.getCost()) : null;
        suscriptionTypeORM.type_suscription = suscription.getSuscription_Type() != null ? SuscriptionTypeTypeORM.from(suscription.getSuscription_Type().getNamePlan()) : null;
        suscriptionTypeORM.time = suscription.getTimeSuscription() != null ? TimeSuscriptionTypeORM.from(suscription.getTimeSuscription()) : null;
        suscriptionTypeORM.active = suscription.getActive() != null ? ActiveTypeORM.from(suscription.getActive()) : null;

        return suscriptionTypeORM;
    }
}
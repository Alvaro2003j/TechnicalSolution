import { ClaimTypeORM } from "src/claim/infrastructure/persistence/typeorm/entities/claim.typeorm";
import { Claim } from "src/claim/domain/entities/claim.entity";
import { ClaimTypeTypeORM } from "src/claim/infrastructure/persistence/typeorm/value-object/claim-type.typeorm";
import { ClaimCostTypeORM } from "src/claim/infrastructure/persistence/typeorm/value-object/claim-cost.typeorm";
import { TimeClaimTypeORM } from "src/claim/infrastructure/persistence/typeorm/value-object/claim-timeclaim.typeorm";
import { ActiveTypeORM } from "src/suscriptions/infrastructure/persistence/typeorm/value-object/suscription-active.typeorm";

export class ClaimMapper {
    public static toTypeORM(claim: Claim): ClaimTypeORM 
    {
        const claimTypeORM: ClaimTypeORM = new ClaimTypeORM();
        claimTypeORM.id = claim.getId() != null ? claim.getId() : 0;
        claimTypeORM.cost = claim.getCost() != null ? ClaimCostTypeORM.from(claim.getCost()) : null;
        claimTypeORM.type_claim = claim.getClaim_Type() != null ? ClaimTypeTypeORM.from(claim.getClaim_Type().getNamePlan()) : null;
        claimTypeORM.time = claim.getTimeClaim() != null ? TimeClaimTypeORM.from(claim.getTimeClaim()) : null;
        claimTypeORM.active = claim.getActive() != null ? ActiveTypeORM.from(claim.getActive()) : null;

        return claimTypeORM;
    }
}
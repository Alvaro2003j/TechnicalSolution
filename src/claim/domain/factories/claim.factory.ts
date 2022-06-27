import { Claim } from "../entities/claim.entity";
import { ClaimId } from "../value-object/claim-id.value";
import { ClaimType } from "../value-object/claimtype.value";

export class ClaimFactory{
    public static createFrom(Cost: number, Claim_Type: ClaimType, TimeClaim: number, Active: boolean) : Claim
    {
        return new Claim(Cost, Claim_Type, TimeClaim, Active);
    }

    public static withId(claimId: ClaimId, cost: number, Claim_Type: ClaimType, TimeClaim: number, active: boolean) : Claim
    {
        let claim: Claim = new Claim(cost, Claim_Type, TimeClaim, active);
        claim.setId(claimId);
        return claim;
    }
}
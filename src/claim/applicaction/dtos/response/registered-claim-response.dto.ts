export class RegisterClaimResponse {
    constructor(
        public id: number,
        public cost: number,
        public Claim_Type: String,
        public TimeClaim: number,
        public Active: boolean
    )
    {}
}
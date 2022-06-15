export class RegisterSuscriptionResponse {
    constructor(
        public id: number,
        public cost: Money,
        public Suscription_Type: String,
        public TimeSuscription: number,
        public Active: boolean
    )
    {}
}
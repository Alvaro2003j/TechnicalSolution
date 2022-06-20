export class RegisterSuscriptionResponse {
    constructor(
        public id: number,
        public cost: number,
        public Suscription_Type: String,
        public TimeSuscription: number,
        public Active: boolean
    )
    {}
}
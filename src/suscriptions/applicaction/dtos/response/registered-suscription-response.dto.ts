export class RegisterSuscriptionResponse {
    constructor(
        public id: number,
        public cost: number,
        public active: boolean,
        public timeSuscription: number,
        public typeSuscription: String        
    )
    {}
}
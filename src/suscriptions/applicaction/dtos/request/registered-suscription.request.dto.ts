export class RegisteredSuscriptionRequest {
    constructor(
        //public readonly id: number,
        public readonly cost: number,
        public readonly active: boolean,
        public readonly timeSuscription: number,
        public readonly typeSuscription: string    
    ) {}
}
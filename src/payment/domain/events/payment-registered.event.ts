export class PaymentRegistered {
    constructor(
        public readonly id: number,
        public readonly type: string,
        public readonly amount: number,
        public readonly suscriptionId: number
    ){}
}
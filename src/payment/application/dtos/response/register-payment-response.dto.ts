export class RegisterPaymentResponse
{
    constructor(
        public id: number,
        public company: string,
        public type: string,
        public suscriptionId: number,
        public date: string,
        public amount: number
    ) {}
}
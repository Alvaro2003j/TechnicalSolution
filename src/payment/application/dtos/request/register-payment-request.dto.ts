export class RegisterPaymentRequest
{
    constructor(
        public readonly suscriptionId: number,
        public readonly type: string,
    ) {}
}
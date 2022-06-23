export class RegisterPayment
{
    constructor(
        public readonly SuscriptionId: number,
        public readonly type: string
    ) {}
}
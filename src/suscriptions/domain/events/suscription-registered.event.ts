export class SuscriptionRegistered {
    constructor(
        public readonly id: number,
        public readonly type: string,
        public readonly cost: number
    ) {}
}
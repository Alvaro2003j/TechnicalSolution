export class ClaimRegistered {
    constructor(
        public readonly id: number,
        public readonly type: string,
        public readonly cost: number
    ) {}
}
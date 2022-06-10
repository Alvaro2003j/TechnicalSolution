import { Money } from "src/common/domain/value-objects/money.value";

export class SuscriptionRegistered {
    constructor(
        public readonly id: number,
        public readonly type: string,
        public readonly cost: Money
    ) {}
}
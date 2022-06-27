import { Column } from "typeorm";

export class TimeClaimTypeORM {
    @Column('int', {name: 'time-claim', nullable: false})
    value: number;

    private constructor(value: number)
    {
        this.value = value;
    }

    public static from(value: number): TimeClaimTypeORM
    {
        return new TimeClaimTypeORM(value);
    }
}
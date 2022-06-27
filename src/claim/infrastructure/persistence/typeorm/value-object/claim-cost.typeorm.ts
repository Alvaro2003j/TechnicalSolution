import { Column, Unique } from 'typeorm';

export class ClaimCostTypeORM {
    @Column('decimal', {name: 'cost', nullable: false})
    value: number;

    private constructor(value: number)
    {
        this.value = value;
    }

    public static from(value: number): ClaimCostTypeORM 
    {
        return new ClaimCostTypeORM(value);
    }
}
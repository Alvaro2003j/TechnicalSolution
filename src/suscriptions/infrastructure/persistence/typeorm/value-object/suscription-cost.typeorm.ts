import { Column, Unique } from 'typeorm';

export class SuscriptionCostTypeORM {
    @Column('decimal', {name: 'cost', nullable: false})
    value: number;

    private constructor(value: number)
    {
        this.value = value;
    }

    public static from(value: number): SuscriptionCostTypeORM 
    {
        return new SuscriptionCostTypeORM(value);
    }
}
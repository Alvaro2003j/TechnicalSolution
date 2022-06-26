import { Column } from "typeorm";

export class TechnicalIdTypeORM
{
    @Column('int', { name: 'technical_id', nullable: false})
    public value: number;

    private constructor(value: number)
    {
        this.value = value;
    }

    public static from(value: number): TechnicalIdTypeORM
    {
        return new TechnicalIdTypeORM(value);
    }
}
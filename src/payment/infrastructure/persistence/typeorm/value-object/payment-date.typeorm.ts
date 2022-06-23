import { Column } from "typeorm";

export class DateTypeORM
{
    @Column('varchar', { name: 'date', length: 7, nullable: false})
    public value: string;

    private constructor(value: string)
    {
        this.value = value;
    }

    public static from(value: string): DateTypeORM
    {
        return new DateTypeORM(value);
    }
}
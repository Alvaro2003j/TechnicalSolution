import { Column } from "typeorm";

export class SuscriptionTypeTypeORM {
    @Column('varchar', {name: 'type', nullable: false})
    public value: string;

    private constructor(value: string)
    {
        this.value = value;
    }

    public static from(value: string): SuscriptionTypeTypeORM
    {
        return new SuscriptionTypeTypeORM(value);
    }
}
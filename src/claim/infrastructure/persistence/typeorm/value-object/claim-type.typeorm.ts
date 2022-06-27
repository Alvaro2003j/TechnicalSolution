import { Column } from "typeorm";

export class ClaimTypeTypeORM {
    @Column('varchar', {name: 'type', nullable: false})
    public value: string;

    private constructor(value: string)
    {
        this.value = value;
    }

    public static from(value: string): ClaimTypeTypeORM
    {
        return new ClaimTypeTypeORM(value);
    }
}
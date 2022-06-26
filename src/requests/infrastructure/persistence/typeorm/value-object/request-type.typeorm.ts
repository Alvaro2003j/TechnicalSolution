import { Column } from "typeorm";

export class RequestTypeTypeORM {
    @Column('varchar', {name: 'type', nullable: false})
    public value: string;

    private constructor(value: string)
    {
        this.value = value;
    }

    public static from(value: string): RequestTypeTypeORM
    {
        return new RequestTypeTypeORM(value);
    }
}
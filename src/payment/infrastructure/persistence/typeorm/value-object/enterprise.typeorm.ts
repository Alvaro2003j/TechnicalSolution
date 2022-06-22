import { Column } from "typeorm";

export class EnterpriseTypeORM{
    @Column('varchar', { name: 'company', length: 15, nullable: false})
    public value: string;

    private constructor(value: string): EnterpriseTypeORM
    {
        return new EnterpriseTypeORM(value);
    }
}
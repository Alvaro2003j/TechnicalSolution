import { Column } from "typeorm";

export class SuscribeIdTypeORM
{
    @Column('bigint', { name: 'suscription_id', unsigned: true})
    public value: number;

    private constructor(value: number){
        this.value = Number(value);
    }

    public static from(value: number) : SuscribeIdTypeORM
    {
        return new SuscribeIdTypeORM(value);
    }
}
import { Column } from "typeorm";

export class TimeSuscriptionTypeORM {
    @Column('number', {name: 'time-suscription', nullable: false})
    value: number;

    private constructor(value: number)
    {
        this.value = value;
    }

    public static from(value: number): TimeSuscriptionTypeORM
    {
        return new TimeSuscriptionTypeORM(value);
    }
}
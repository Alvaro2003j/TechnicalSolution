import { Column } from 'typeorm';

export class ActiveTypeORM {
    @Column('boolean', {name: 'active', nullable: false})
    public value: boolean;

    private constructor(value: boolean)
    {
        this.value = value;
    }

    public static from(value: boolean)
    {
        return new ActiveTypeORM(value);
    }
}
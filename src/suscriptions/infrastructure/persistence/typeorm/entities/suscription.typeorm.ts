import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ActiveTypeORM } from '../value-object/suscription-active.typeorm';
import { SuscriptionCostTypeORM } from '../value-object/suscription-cost.typeorm';
import { TimeSuscriptionTypeORM } from '../value-object/suscription-timesuscription.typeorm';
import { SuscriptionTypeTypeORM } from '../value-object/suscription-type.typeorm';

@Entity('suscriptions')
export class SuscriptionTypeORM {
    @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'id', unsigned: true})
    public id: number;

    @Column((type) => SuscriptionCostTypeORM, {prefix: false})
    public cost: SuscriptionCostTypeORM;

    @Column((type) => ActiveTypeORM, {prefix: false})
    public active: ActiveTypeORM;

    @Column((type) => TimeSuscriptionTypeORM, {prefix: false})
    public time: TimeSuscriptionTypeORM;

    @Column((type) => SuscriptionTypeTypeORM, {prefix: false})
    public type_suscription: SuscriptionTypeTypeORM;
}
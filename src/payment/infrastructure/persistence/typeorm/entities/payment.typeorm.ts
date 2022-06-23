import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { EnterpriseTypeORM } from '../value-object/enterprise.typeorm';
import { AmountTypeORM } from '../value-object/payment-amount.typeorm';
import { DateTypeORM } from '../value-object/payment-date.typeorm';
import { SuscribeIdTypeORM } from '../value-object/suscribe-id.typeorm';

@Entity('payments')
export class PaymentTypeORM
{
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column((type) => EnterpriseTypeORM, {prefix: false})
    public name:  EnterpriseTypeORM;

    @Column((type) => SuscribeIdTypeORM, {prefix: false})
    public suscriptionId: SuscribeIdTypeORM;

    @Column((type) => DateTypeORM, {prefix: false})
    public date: DateTypeORM;

    @Column((type) => AmountTypeORM, {prefix: false})
    public amount: AmountTypeORM;
    
}
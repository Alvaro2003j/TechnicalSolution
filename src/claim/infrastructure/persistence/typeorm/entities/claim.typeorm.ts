import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ActiveTypeORM } from '../value-object/claim-active.typeorm';
import { ClaimCostTypeORM } from '../value-object/claim-cost.typeorm';
import { TimeClaimTypeORM } from '../value-object/claim-timeclaim.typeorm';
import { ClaimTypeTypeORM } from '../value-object/claim-type.typeorm';

@Entity('claims')
export class ClaimTypeORM {
    @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'id', unsigned: true})
    public id: number;

    @Column((type) =>ClaimCostTypeORM, {prefix: false})
    public cost: ClaimCostTypeORM;

    @Column((type) => ActiveTypeORM, {prefix: false})
    public active: ActiveTypeORM;

    @Column((type) => TimeClaimTypeORM, {prefix: false})
    public time: TimeClaimTypeORM;

    @Column((type) => ClaimTypeTypeORM, {prefix: false})
    public type_claim: ClaimTypeTypeORM;
}
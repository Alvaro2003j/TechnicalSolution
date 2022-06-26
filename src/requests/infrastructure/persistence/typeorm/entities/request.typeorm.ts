import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DateTypeORM } from '../value-object/request-date.typeorm';
import { MessageTypeORM } from '../value-object/request-message.typeorm';
import { TechnicalIdTypeORM } from '../value-object/request-technicalId.typeorm';

@Entity('requests')
export class RequestTypeORM
{
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public id: number;

    @Column((type) => TechnicalIdTypeORM, {prefix: false})
    public technicalId: TechnicalIdTypeORM;

    @Column((type) => DateTypeORM, {prefix: false})
    public date: DateTypeORM;

    @Column((type) => MessageTypeORM, {prefix: false})
    public message: MessageTypeORM;

        
}
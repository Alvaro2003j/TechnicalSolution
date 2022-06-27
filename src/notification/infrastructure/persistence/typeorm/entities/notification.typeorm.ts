import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NotificationIdTypeORM } from "../value-objetc/notification.id.typeorm";

@Entity('notification')
export class NotificationTypeORM {
    @Column((type) => NotificationIdTypeORM, { prefix: false })
    public id: NotificationIdTypeORM

    @Column('varchar', {name: 'title', length: 500, nullable: false})
    public title: string;

    @Column('varchar', {name: 'description', length: 500, nullable: false})
    public description: string;

    @Column('bool', {name:'visible', nullable: false})
    public visible: boolean;

    @Column('int', {name: 'clientId', nullable: false})
    public clientId: number;
}
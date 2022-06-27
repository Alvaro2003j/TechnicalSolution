import { Notification } from "src/notification/domain/entities/notification.entity";
import { NotificationTypeORM } from "src/notification/infrastructure/persistence/typeorm/entities/notification.typeorm";
import { NotificationIdTypeORM } from "src/notification/infrastructure/persistence/typeorm/value-objetc/notification.id.typeorm";

export class NotificationMapper {
    public static toTypeORM (notification: Notification): NotificationTypeORM {
        const notificationTypeORM: NotificationTypeORM = new NotificationTypeORM();

        notificationTypeORM.id = NotificationIdTypeORM.from (
            notification.getId().getValue(),
        );

            notificationTypeORM.title = notification.getTitle();
            notificationTypeORM.description = notification.getDescription();
            notificationTypeORM.visible = notification.getVisible();
            notificationTypeORM.clientId = notification.getClientId();

        return notificationTypeORM;
    }
}
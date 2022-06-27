import { Notification } from "../entities/notification.entity";
import { NotificationId } from "../value-object/notification-id.value";

export class NotificationFactory {
    public static createForm(
        title: string,
        description: string,
        visible: boolean,
        clientId: number
    ): Notification {
        return new Notification(
            NotificationId.create(0),
            title,
            description,
            visible,
            clientId
        );
    }
    public static withId(
        NotificationId: NotificationId,
        title: string,
        description: string,
        visible: boolean,
        clientId: number
    ): Notification {
        return new Notification(
            NotificationId,
            title,
            description,
            visible,
            clientId
        );
    }
}
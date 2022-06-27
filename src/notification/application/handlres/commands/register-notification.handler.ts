import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Notification } from "src/notification/domain/entities/notification.entity";
import { NotificationFactory } from "src/notification/domain/factories/notification.factory";
import { NotificationId } from "src/notification/domain/value-object/notification-id.value";
import { NotificationTypeORM } from "src/notification/infrastructure/persistence/typeorm/entities/notification.typeorm";
import { Repository } from "typeorm";
import { RegisterNotificationCommand } from "../../commands/register-notification.command";
import { NotificationMapper } from "../../mappers/notification.mapper";

@CommandHandler(RegisterNotificationCommand)
export class RegisterNotificationHandler implements ICommandHandler<RegisterNotificationCommand> {
    constructor (
        private notificationRepository: Repository<NotificationTypeORM>,
        private publisher: EventPublisher,
    ) {}
    async execute(command: RegisterNotificationCommand) {
        let notification: Notification = NotificationFactory.createForm(
            command.title,
            command.description,
            command.visible,
            command.clientId
        );

        let notificationTypeORM = NotificationMapper.toTypeORM(notification);
        notificationTypeORM = await this.notificationRepository.save(notificationTypeORM);

        if (notificationTypeORM == null) {
            return 0;
        }

        const notificationId = Number(notificationTypeORM.id.value);
        notification.changeId(NotificationId.create(notificationId));
        notification = this.publisher.mergeObjectContext(notification);
        notification.register();
        notification.commit();

        return notificationId;
    }
}
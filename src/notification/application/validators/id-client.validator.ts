import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { NotificationTypeORM } from "src/notification/infrastructure/persistence/typeorm/entities/notification.typeorm";
import { Repository } from "typeorm";

export class IdNotificationValidator {
    constructor (
        @InjectRepository(NotificationTypeORM)
        private notificationRepository: Repository<NotificationTypeORM>,
    ) {}

    public async validate(id: number): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();

        if (id < 0) {
            notification.addError(
                'The notification id must be a positive integer',
                null,
            );
        }

        if (notification.hasErrors()) {
            return notification;
        }

        const notificationTypeORM: NotificationTypeORM = await this.notificationRepository.createQueryBuilder().where("id = :id", { id }).getOne();
        if (notificationTypeORM == null) {
            notification.addError(`There is no notification with id: ${id}`, null);
        }

        return notification;
    }
}
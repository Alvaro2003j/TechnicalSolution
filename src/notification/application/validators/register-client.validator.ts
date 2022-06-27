import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { NotificationTypeORM } from "src/notification/infrastructure/persistence/typeorm/entities/notification.typeorm";
import { Repository } from "typeorm";
import { RegisterNotificationDto } from "../dtos/request/register-notification-request.dto";

export class RegisterNotificationValidator {
    constructor(
        @InjectRepository(NotificationTypeORM)
        private notificationRepository: Repository<NotificationTypeORM>,
    ) {}

    public async validate(
        registerNotificationRequestDto: RegisterNotificationDto,
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();

        const title: string = registerNotificationRequestDto.title.trim();

        if (title.length <= 0) {
            notification.addError('Notification title is required', null);
        }

        const description: string = registerNotificationRequestDto.description.trim();

        if (description.length <= 0) {
            notification.addError('Notification description is required', null);
        }

        if(notification.hasErrors()) {
            return notification;
        }

        const clientId: number = registerNotificationRequestDto.clientId;
        const notification1: NotificationTypeORM = await this.notificationRepository
            .createQueryBuilder()
            .where('clientId = :clientId', { clientId })
            .getOne();
        if (notification1 == null) {
            notification.addError('Notification clientId is wrong', null)
        }

        return notification;
    }
}
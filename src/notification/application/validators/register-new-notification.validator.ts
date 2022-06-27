import { InjectRepository } from "@nestjs/typeorm";
import { ClientTypeORM } from "src/clients/infrastructure/persistence/typeorm/entities/client.typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { NotificationTypeORM } from "src/notification/infrastructure/persistence/typeorm/entities/notification.typeorm";
import { Repository } from "typeorm";
import { RegisterNewNotificationRequestDto } from "../dtos/request/register-new-notification-request.dto";

export class RegisterNotificationValidator {
    constructor(
        @InjectRepository(NotificationTypeORM)
        private notifiactionRepository: Repository<NotificationTypeORM>,
        @InjectRepository(ClientTypeORM)
        private clientRepository: Repository<ClientTypeORM>,
    ) {}

    public async validate(
        registerNotificationRequestDto: RegisterNewNotificationRequestDto, ida: number,
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

        if (notification.hasErrors()) {
            return notification;
        }

        const clientId: number = ida;
        const client: ClientTypeORM = await this.clientRepository
        .createQueryBuilder()
        .where('id = :clientId', {clientId})
        .getOne();

        if(client == null){
            notification.addError('Notification companyId is bad', null);
        } 

        return notification;
    }
}
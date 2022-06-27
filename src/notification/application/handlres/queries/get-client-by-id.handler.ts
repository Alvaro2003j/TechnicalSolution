import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { NotificationTypeORM } from "src/notification/infrastructure/persistence/typeorm/entities/notification.typeorm";
import { Repository } from "typeorm";
import { GetNotificationByIdQuery } from "../../queries/get-notification-by-id.query";

@QueryHandler(GetNotificationByIdQuery)
export class GetNotificationByIdHandler implements IQueryHandler<GetNotificationByIdQuery> {
    constructor(
        @InjectRepository(NotificationTypeORM)
        private notificationRepository: Repository<NotificationTypeORM>
    ) {}

    async execute(query: GetNotificationByIdQuery) {
        const id = query.id;

        const notification: NotificationTypeORM = await this.notificationRepository.createQueryBuilder().where("id = :id", { id }).getOne();
        //this.accountRepository.createQueryBuilder().where("number = :number", { number }).getOne();
        return notification;
    }
}
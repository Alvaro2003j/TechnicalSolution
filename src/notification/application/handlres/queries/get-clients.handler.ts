import { IQueryHandler } from "@nestjs/cqrs";
import { getManager } from "typeorm";
import { GetNotificationsDto } from "../../dtos/queries/get-notifications.dto";
import { GetNotificationsQuery } from "../../queries/get-notification-query";

export class GetNotificationsHandler implements IQueryHandler<GetNotificationsQuery> {
    constructor() {}

    async execute(query: GetNotificationsQuery) {
        const manager = getManager();

        const sql = `
        SELECT
            id,
            title,
            description,
            visible,
            client_id as clientId
        FROM
            clients
        ORDER BY
            name_client;
        `;

        const ormNotifications = await manager.query(sql);

        if (ormNotifications.length <= 0) {
            return [];
        }

        const Notification: GetNotificationsDto[] = ormNotifications.map(function (ormNotification: { id: any; title: string; description: string; visible: boolean; client_id: number; },) {
            const notificationDto = new GetNotificationsDto();
            notificationDto.id = Number(ormNotification.id);
            notificationDto.title = ormNotification.title;
            notificationDto.description = ormNotification.description;
            notificationDto.visible = ormNotification.visible;
            notificationDto.clientId = ormNotification.client_id;
            return notificationDto;
        });
        return Notification;
    }
}
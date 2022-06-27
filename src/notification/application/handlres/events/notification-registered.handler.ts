import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { NotificationRegisteredEvent } from "src/notification/domain/events/notification-registered.event";

@EventsHandler(NotificationRegisteredEvent)
export class NotificationRegisteredHandler implements IEventHandler<NotificationRegisteredEvent> {
    constructor() {}

    async handle(event: NotificationRegisteredEvent) {
        console.log(event);
    }
}
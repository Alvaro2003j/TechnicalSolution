import { AggregateRoot } from "@nestjs/cqrs";
import { NotificationRegisteredEvent } from "../events/notification-registered.event";
import { NotificationId } from "../value-object/notification-id.value";
import { ClientId } from "src/clients/domain/value-objects/client-id.value";

export class Notification extends AggregateRoot {
    public id: NotificationId;
    private title: string;
    private description: string;
    private visible: boolean;
    private clientId: number;

    public constructor(
        id: NotificationId,
        title: string,
        description: string,
        visible: boolean,
        clientId: number,
    ) {
        super ();
        this.id = id;
        this.title = title;
        this.description = description;
        this.visible = visible;
        this.clientId = clientId;
    }
    public register() {
        const event = new NotificationRegisteredEvent(
            this.id.getValue(),
            this.title,
            this.description,
            this.visible,
            this.clientId,
        );
        this.apply(event)
    }
    public getId(): NotificationId {
        return this.id;
    }
    public getTitle(): string {
        return this.title;
    }
    public getDescription(): string {
        return this.description;
    }
    public getVisible(): boolean {
        return this.visible;
    }
    public getClientId(): number {
        return this.clientId;
    }
    public changeId(id: NotificationId) {
        this.id = id;
    }
}
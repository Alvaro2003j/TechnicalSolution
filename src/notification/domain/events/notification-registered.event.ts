export class NotificationRegisteredEvent {
    constructor (
        public id: number,
        public title: string,
        public description: string,
        public visible: boolean,
        public clientId: number
    ) {}
}
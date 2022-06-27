export class RegisterNotificationResponseDto {
    constructor (
        public id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly visible: boolean,
        public readonly clientId: number
    ) {}
}
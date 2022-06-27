export class RegisterNewNotificationRequestDto {
    constructor (
        public readonly id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly visible: boolean
    ) {}
}
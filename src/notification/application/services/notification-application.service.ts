import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterNotificationCommand } from "../commands/register-notification.command";
import { RegisterNotificationDto } from "../dtos/request/register-notification-request.dto";
import { GetNotificationByIdResponseDto } from "../dtos/response/get-notification-by-id-response.dto";
import { RegisterNotificationResponseDto } from "../dtos/response/register-notification-response.dto";
import { GetNotificationByIdQuery } from "../queries/get-notification-by-id.query";
import { IdNotificationValidator } from "../validators/id-client.validator";
import { RegisterNotificationValidator } from "../validators/register-client.validator";

export class NotificationApplicationService {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        private registerNotificationValidator: RegisterNotificationValidator,
        private idValidator: IdNotificationValidator,
    ) {}
    async getById(
        id: number,
    ): Promise<Result<AppNotification, GetNotificationByIdResponseDto>> {

        const notification: AppNotification = await this.idValidator.validate(id);
        if (notification.hasErrors()) {
            return Result.error(notification);
        }

        const getNotificationByIdQuery: GetNotificationByIdQuery = new GetNotificationByIdQuery(id);
        const notificationTypeORM = await this.queryBus.execute(getNotificationByIdQuery);

        const getByIdResponseDto: GetNotificationByIdResponseDto = new GetNotificationByIdResponseDto(
            notificationTypeORM.id.value,
            notificationTypeORM.title,
            notificationTypeORM.description,
            notificationTypeORM.visible,
            notificationTypeORM.clientId,
        );
        return Result.ok(getByIdResponseDto);
    }
    async register(
        registerNotificationRequestDto: RegisterNotificationDto,
    ): Promise<Result<AppNotification, RegisterNotificationResponseDto>> {
        const notification: AppNotification = await this.registerNotificationValidator.validate(
            registerNotificationRequestDto,
        );
        if (notification.hasErrors()) {
            return Result.error(notification);
        }

        const registerNotificationCommand: RegisterNotificationCommand = new RegisterNotificationCommand(
            registerNotificationRequestDto.title,
            registerNotificationRequestDto.description,
            registerNotificationRequestDto.visible,
            registerNotificationRequestDto.clientId,
        );
        const notificationId = await this.commandBus.execute(
            registerNotificationCommand,
        );

        const registerNotificationResponseDto: RegisterNotificationResponseDto = new RegisterNotificationResponseDto(
            notificationId,
            registerNotificationRequestDto.title,
            registerNotificationRequestDto.description,
            registerNotificationRequestDto.visible,
            registerNotificationRequestDto.clientId,
        );
        return Result.ok(registerNotificationResponseDto);
    }
}
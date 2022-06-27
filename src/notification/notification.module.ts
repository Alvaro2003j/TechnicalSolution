import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientTypeORM } from 'src/clients/infrastructure/persistence/typeorm/entities/client.typeorm';
import { NotificationController } from './api/notification.controller';
import { RegisterNotificationHandler } from './application/handlres/commands/register-notification.handler';
import { NotificationRegisteredHandler } from './application/handlres/events/notification-registered.handler';
import { GetNotificationByIdHandler } from './application/handlres/queries/get-client-by-id.handler';
import { GetNotificationsHandler } from './application/handlres/queries/get-clients.handler';
import { NotificationApplicationService } from './application/services/notification-application.service';
import { IdNotificationValidator } from './application/validators/id-client.validator';
import { RegisterNotificationValidator } from './application/validators/register-client.validator';
import { NotificationTypeORM } from './infrastructure/persistence/typeorm/entities/notification.typeorm';

export const CommandHandlers = [RegisterNotificationHandler];
export const EventHandlers = [NotificationRegisteredHandler];
export const QueryHandlers = [
  GetNotificationsHandler,
  GetNotificationByIdHandler,
];
export const Validators = [
  RegisterNotificationValidator,
  IdNotificationValidator,
];
@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([NotificationTypeORM]),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationApplicationService,
    ...Validators,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class NotificationModule {}

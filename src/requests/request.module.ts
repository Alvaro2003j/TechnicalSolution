import { Module } from '@nestjs/common';
import { RequestController } from './api/request.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterRequestHandler } from './application/handlers/commands/register-request.handler';
import { RequestRegisteredHandler } from './application/handlers/events/request-registered.handler';
import { RequestTypeORM } from './infrastructure/persistence/typeorm/entities/request.typeorm';
import { RequestApplicationService } from './application/services/request-application.service';
import { RegisterRequestValidator } from './application/validators/registered-request.validator';

export const CommandHandlers = [RegisterRequestHandler];
export const EventHandlers = [RequestRegisteredHandler];
export const QueryHandlers = [];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([RequestTypeORM]),
    ],
    controllers: [RequestController],
    providers: [
        RequestApplicationService,
        RegisterRequestValidator,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers
    ]
})
export class RequestsModule {}
import { Module } from '@nestjs/common';
import { SuscriptionController } from './api/suscriptions.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterSuscriptionHandler } from './applicaction/handlers/commands/register-suscription.handler';
import { SuscriptionRegisteredHandler } from './applicaction/handlers/events/suscription-registered.handler';
import { SuscriptionTypeORM } from './infrastructure/persistence/typeorm/entities/suscription.typeorm';
import { SuscriptionApplicationService } from './applicaction/services/suscription-application.service';
import { RegisterSuscriptionValidator } from './applicaction/validators/registered-suscription.validator';
import { GetSuscriptionsHandler } from './applicaction/handlers/queries/get-suscriptions.handler';
import { GetSuscriptionByIdHandler } from './applicaction/handlers/queries/get-suscription-by-id.handler';

export const CommandHandlers = [RegisterSuscriptionHandler];
export const EventHandlers = [SuscriptionRegisteredHandler];
export const QueryHandlers = [GetSuscriptionsHandler, GetSuscriptionByIdHandler];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([SuscriptionTypeORM]),
    ],
    controllers: [SuscriptionController],
    providers: [
        SuscriptionApplicationService,
        RegisterSuscriptionValidator,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers
    ]
})
export class SuscriptionsModule {}
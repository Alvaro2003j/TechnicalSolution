import { Module } from '@nestjs/common';
import { ClaimController } from './api/claims.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterClaimHandler } from './applicaction/handlers/commands/register-claim.handler';
import { ClaimRegisteredHandler } from './applicaction/handlers/events/claim-registered.handler';
import { ClaimTypeORM } from './infrastructure/persistence/typeorm/entities/claim.typeorm';
import { ClaimApplicationService } from './applicaction/services/claim-application.service';
import { RegisterClaimValidator } from './applicaction/validators/registered-claim.validator';

export const CommandHandlers = [RegisterClaimHandler];
export const EventHandlers = [ClaimRegisteredHandler];
export const QueryHandlers = [];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([ClaimTypeORM]),
    ],
    controllers: [ClaimController],
    providers: [
        ClaimApplicationService,
        RegisterClaimValidator,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers
    ]
})
export class ClaimsModule {}
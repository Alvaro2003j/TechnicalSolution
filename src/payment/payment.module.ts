import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentsController } from "./api/payment.controller";
import { RegisterPaymentHandler } from "./application/handlers/commands/register-payment.handler";
import { PaymentRegisteredHandler } from "./application/handlers/events/payment-registered.handler";
import { GetPaymentByIdHandler } from "./application/handlers/queries/get-payment-by-id.handler";
import { GetPaymentsQuery } from "./application/queries/get-payments.query";
import { PaymentsApplicationService } from "./application/services/payments-application.service";
import { RegisterPaymentValidator } from "./application/validators/register-payment.validator";
import { PaymentTypeORM } from "./infrastructure/persistence/typeorm/entities/payment.typeorm";

export const CommandHandlers = [RegisterPaymentHandler];
export const EventHandlers = [PaymentRegisteredHandler];
export const QueryHandlers = [ GetPaymentByIdHandler, GetPaymentsQuery,];

export const Validators = [RegisterPaymentValidator];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([PaymentTypeORM]),
    ],
    controllers: [PaymentsController],
    providers: [
        PaymentsApplicationService,
        ...Validators,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers
    ]
})
export class PaymentsModule {}
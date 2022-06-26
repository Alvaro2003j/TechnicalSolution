import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PaymentRegistered } from "src/payment/domain/events/payment-registered.event";

@EventsHandler(PaymentRegistered)
export class PaymentRegisteredHandler implements IEventHandler<PaymentRegistered>
{
    constructor() {}

    async handle(event: PaymentRegistered) {
        console.log('handle logic for PaymentRegisterd');
        console.log(event);
    }
}
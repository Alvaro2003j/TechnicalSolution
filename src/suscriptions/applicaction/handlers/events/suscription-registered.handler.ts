import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SuscriptionRegistered } from 'src/suscriptions/domain/events/suscription-registered.event';

@EventsHandler(SuscriptionRegistered)
export class SuscriptionRegisteredHandler implements IEventHandler<SuscriptionRegistered> {
    constructor() {}

    async handle(event: SuscriptionRegistered) {
        console.log('handle logic for SuscriptionRegistered');
        console.log(event);
    }
}
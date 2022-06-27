import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClaimRegistered } from 'src/claim/domain/events/claim-registered.event';

@EventsHandler(ClaimRegistered)
export class ClaimRegisteredHandler implements IEventHandler<ClaimRegistered> {
    constructor() {}

    async handle(event: ClaimRegistered) {
        console.log('handle logic for ClaimRegistered');
        console.log(event);
    }
}
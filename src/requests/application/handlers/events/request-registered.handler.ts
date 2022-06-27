import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { RequestRegistered } from 'src/requests/domain/events/request-registered.event';

@EventsHandler(RequestRegistered)
export class RequestRegisteredHandler implements IEventHandler<RequestRegistered> {
    constructor() {}

    async handle(event: RequestRegistered) {
        console.log('handle logic for RequestRegistered');
        console.log(event);
    }
}
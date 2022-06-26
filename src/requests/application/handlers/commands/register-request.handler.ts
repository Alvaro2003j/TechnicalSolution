import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { RegisterRequest } from '../../commands/open-request.command';
import { RequestTypeORM } from 'src/requests/infrastructure/persistence/typeorm/entities/request.typeorm';
import { RequestType } from 'src/requests/domain/value-object/request-type.value';
import { RequestFactory } from 'src/requests/domain/factories/request.factory';
import { TechnicalId } from 'src/common/domain/value-objects/technical-id.value';
import { Request } from 'src/requests/domain/entities/request.entity';
import { RequestMapper } from '../../mappers/request.mapper';
import { RequestId } from 'src/requests/domain/value-object/request-id.value';

@CommandHandler(RegisterRequest)
export class RegisterRequestHandler implements ICommandHandler<RegisterRequest>
{
    constructor(
        @InjectRepository(RequestTypeORM)
        private requestRepository: Repository<RequestTypeORM>,
        private publisher: EventPublisher,
    ) {}

    async execute(command: RegisterRequest): Promise<any> {
        let requestId: number = 0;
        const message: string = "";
        const date: string = "";
        const technicalId: TechnicalId = TechnicalId.of(command.technicalId);

        let request: Request = RequestFactory.createFrom(technicalId, date, message);
        let requestTypeORM: RequestTypeORM = RequestMapper.toTypeORM(request);
        requestTypeORM = await this.requestRepository.save(requestTypeORM);
        if (requestTypeORM == null) { return requestId; }
        requestId = Number(requestTypeORM.id);
        request.setId(RequestId.of(requestId));
        request = this.publisher.mergeObjectContext(request);
        request.Register();
        request.commit();
        return requestId;
    }
}
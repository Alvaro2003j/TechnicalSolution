import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RequestTypeORM } from 'src/requests/infrastructure/persistence/typeorm/entities/request.typeorm';
import { Repository } from 'typeorm';
import { RegisteredRequestRequest } from '../dtos/request/registered-request.request.dto';

@Injectable()
export class RegisterRequestValidator {
    constructor(@InjectRepository(RequestTypeORM) private requestRepository: Repository<RequestTypeORM>) {}

    public async validate(registerRequestRequestDto: RegisteredRequestRequest) : Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        if (notification.hasErrors())
        {
            return notification;
        }
        const requestTypeORM = await this.requestRepository.createQueryBuilder().getOne();
        if (requestTypeORM != null)
        {
            notification.addError('Request type is taken', null)
        }
        return notification;
    }
}
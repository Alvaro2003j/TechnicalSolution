import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { SuscriptionTypeORM } from 'src/suscriptions/infrastructure/persistence/typeorm/entities/suscription.typeorm';
import { Repository } from 'typeorm';
import { RegisteredSuscriptionRequest } from '../dtos/request/registered-suscription.request.dto';

@Injectable()
export class RegisterSuscriptionValidator {
    constructor(@InjectRepository(SuscriptionTypeORM) private suscriptionRepository: Repository<SuscriptionTypeORM>) {}

    public async validate(registerSuscriptionRequestDto: RegisteredSuscriptionRequest) : Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const type: string = registerSuscriptionRequestDto.type.trim();
        if (type.length <= 0) 
        {
            notification.addError('Suscription type is required', null);
        }
        if (notification.hasErrors())
        {
            return notification;
        }
        suscriptionTypeORM = await this.suscriptionRepository.createQueryBuilder().where("type = :type", {type}).getOne();
        if (suscriptionTypeORM != null)
        {
            notification.addError('Suscription type is taken', null)
        }
        return notification;
    }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { PaymentTypeORM } from "src/payment/infrastructure/persistence/typeorm/entities/payment.typeorm";
import { Repository } from "typeorm";
import { RegisterPaymentRequest } from "../dtos/request/register-payment-request.dto";

@Injectable()
export class RegisterPaymentValidator{
    constructor(@InjectRepository(PaymentTypeORM) private paymentRepository: Repository<PaymentTypeORM>) {}

    public async validate(registerPaymentRequestDto: RegisterPaymentRequest): Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const type: string = registerPaymentRequestDto.type.trim();
        if (type.length <= 0) {
            notification.addError('Payment type is required', null);
        }
        if (notification.hasErrors()) { return notification; }
        const paymentTypeORM: PaymentTypeORM = await this.paymentRepository.createQueryBuilder().where("type = :type", {type}).getOne();
        if (paymentTypeORM != null) { notification.addError('Payment type is taken', null); }
        return notification;
    }
}
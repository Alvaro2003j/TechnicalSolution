import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterPayment } from "../commands/register-payment.command";
import { RegisterPaymentRequest } from "../dtos/request/register-payment-request.dto";
import { RegisterPaymentResponse } from "../dtos/response/register-payment-response.dto";
import { RegisterPaymentValidator } from "../validators/register-payment.validator";

@Injectable()
export class PaymentsApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerPaymentValidator: RegisterPaymentValidator,
    ) {}

    async register(registerPaymentRequestDto: RegisterPaymentRequest) : Promise<Result<AppNotification, RegisterPaymentResponse>> {
        const notification: AppNotification = await this.registerPaymentValidator.validate(registerPaymentRequestDto);
        if (notification.hasErrors()) { return Result.error(notification); }
        const registerPayment: RegisterPayment = new RegisterPayment(
            registerPaymentRequestDto.suscriptionId,
            registerPaymentRequestDto.type
        );
        const paymentId: number = await this.commandBus.execute(registerPayment);
        const registerPaymentResponse: RegisterPaymentResponse = new RegisterPaymentResponse(
            paymentId, null, registerPayment.type, registerPayment.SuscriptionId, null, null
        );
        return Result.ok(registerPaymentResponse);
    }
}
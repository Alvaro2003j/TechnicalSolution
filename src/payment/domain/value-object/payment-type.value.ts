import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class PaymentType {
    private readonly type: string;

    private constructor(type: string)
    {
        this.type = type;
    }

    public getType(): string {
        return this.type;
    }

    public static create(value: string): Result<AppNotification, PaymentType> {
        let notification: AppNotification = new AppNotification();
        value = (value ?? "").trim();
        if (value === "")
        {
            notification.addError('Type Payment is requeried', null);
        }
        if (notification.hasErrors())
        {
            return Result.error(notification);
        }
        return Result.ok(new PaymentType(value));
    }
}
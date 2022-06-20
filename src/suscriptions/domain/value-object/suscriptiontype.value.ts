import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class SuscriptionType {
  private readonly name_plan: string;

  private constructor(name_plan: string) {
    this.name_plan = name_plan;
  }

  public getNamePlan(): string {
    return this.name_plan;
  }

  public static create(value: string): Result<AppNotification, SuscriptionType> {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('Tpye Suscription is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new SuscriptionType(value));
  }
}
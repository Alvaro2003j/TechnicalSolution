import { AggregateRoot } from "@nestjs/cqrs"
import { CompanyName } from "src/common/domain/value-objects/company-name.value";
import { TechnicalId } from "src/common/domain/value-objects/technical-id.value";
import { RequestRegistered } from "../events/request-registered.event";
import { RequestId } from "../value-object/request-id.value";
import { RequestType } from "../value-object/request-type.value";

export class Request extends AggregateRoot {
    private id: RequestId;
    private technicalId: TechnicalId;
    private date: string;
    private message: string;


    public constructor(technicalId: TechnicalId, date: string, message: string)
    {
        super();
        this.technicalId = technicalId;
        this.date = date;
        this.message = message;
    }

    public getId(): RequestId
    {
        return this.id;
    }
    public setId(id: RequestId)
    {
        this.id = id;
    }

    public getTechnicalId(): TechnicalId
    {
        return this.technicalId;
    }

    public setTechnicalId(technicalId: TechnicalId)
    {
        this.technicalId = technicalId;
    }

    public getDate(): string
    {
        return this.date;
    }

    public setDate(date: string)
    {
        this.date = date;
    }

    public getMessage(): string
    {
        return this.message;
    }

    public setMessage(message: string)
    {
        this.message = message;
    }

    public Register() {
        const event = new RequestRegistered(this.id.getValue(), this.message, this.date, this.technicalId.getValue());
        this.apply(event);
      }

}
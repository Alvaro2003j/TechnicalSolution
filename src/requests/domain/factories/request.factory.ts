import { CompanyName } from "src/common/domain/value-objects/company-name.value";
import { TechnicalId } from "src/common/domain/value-objects/technical-id.value";
import { Request } from "../entities/request.entity";
import { RequestId } from "../value-object/request-id.value";
import { RequestType } from "../value-object/request-type.value";

export class RequestFactory {
    public static createFrom(technicalId:TechnicalId, date:string, message:string){
        return new Request(technicalId, date, message);
    }
    public static withId(requestId: RequestId, technicalId:TechnicalId, date:string, message:string): Request
    {
        let request: Request = new Request(technicalId, date, message);
        request.setId(requestId);
        return request;
    }
}
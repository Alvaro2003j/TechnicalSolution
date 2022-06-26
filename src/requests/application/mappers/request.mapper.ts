import { RequestTypeORM } from "src/requests/infrastructure/persistence/typeorm/entities/request.typeorm";
import { Request } from "src/requests/domain/entities/request.entity";
import { DateTypeORM } from "src/requests/infrastructure/persistence/typeorm/value-object/request-date.typeorm";
import { MessageTypeORM } from "src/requests/infrastructure/persistence/typeorm/value-object/request-message.typeorm";
import { TechnicalIdTypeORM } from "src/requests/infrastructure/persistence/typeorm/value-object/request-technicalId.typeorm";

export class RequestMapper {
    public static toTypeORM(request: Request): RequestTypeORM 
    {
        const requestTypeORM: RequestTypeORM = new RequestTypeORM();
        requestTypeORM.id = request.getId() != null ? request.getId().getValue() : 0;
        requestTypeORM.date = request.getDate() != null ? DateTypeORM.from(request.getDate()) : null;
        requestTypeORM.message = request.getMessage() != null ? MessageTypeORM.from(request.getMessage()) : null;
        requestTypeORM.technicalId = request.getTechnicalId() != null ? TechnicalIdTypeORM.from(request.getTechnicalId().getValue()) : null;

        return requestTypeORM;
    }
}
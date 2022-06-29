import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { GetPaymentsDto } from "../../dtos/queries/get-payment.dto";
import { GetPaymentsByIdQuery } from "../../queries/get-payments-by-id.query";

@QueryHandler(GetPaymentsByIdQuery)
export class GetPaymentByIdHandler implements IQueryHandler<GetPaymentsByIdQuery>
{
    constructor(private dataSource: DataSource) {}

    async execute(query: GetPaymentsByIdQuery): Promise<any> {
        const manager = this.dataSource.createEntityManager();
        const sql = ` 
        SELECT
         p.id,
         p.enterprise,
         p.suscriptionId,
         p.date,
         p.amount
        FROM
         payments p
        WHERE
         p.id = ?;`;
        const ormPayments = await manager.query(sql, [query.paymentId]);
        if (ormPayments.length <= 0) { return {} ;}
        const ormPayment = ormPayments[0];
        let paymentDto = new GetPaymentsDto();
        paymentDto.id = Number(ormPayment.id);
        paymentDto.type = ormPayment.type;
        paymentDto.enterprise = ormPayment.enterprise;
        paymentDto.suscriptionId = Number(ormPayment.suscription_Id);
        paymentDto.date = ormPayment.date;
        paymentDto.amount = Number(ormPayment.amount);
        return paymentDto;
    }
}
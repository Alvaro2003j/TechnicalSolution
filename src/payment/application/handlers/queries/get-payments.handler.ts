import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { GetPaymentsDto } from "../../dtos/queries/get-payment.dto";
import { GetPaymentsQuery } from "../../queries/get-payments.query";


@QueryHandler(GetPaymentsQuery)
export class GetPaymentsHandler implements IQueryHandler<GetPaymentsQuery> {
    constructor(private dataSource: DataSource) {}

    async execute(query: GetPaymentsQuery): Promise<any> {
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
        `; 
        const ormPayments = await manager.query(sql);
        if (ormPayments.length <= 0) { return[]; }
        const payments: GetPaymentsDto[] = ormPayments.map(function (ormPayment){
            let paymentDto = new GetPaymentsDto();
            paymentDto.id = Number(ormPayment.id);
            paymentDto.type = ormPayment.type;
            paymentDto.enterprise = ormPayment.enterprise;
            paymentDto.suscriptionId = Number(ormPayment.suscription_Id);
            paymentDto.date = ormPayment.date;
            paymentDto.amount = Number(ormPayment.amount);
            return paymentDto;
        });
        return payments
    }
}
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetSuscriptionsDto } from '../../dtos/queries/get-suscriptions.dto';
import { GetSuscriptionsQuery } from '../../queries/get-suscriptions-query';

@QueryHandler(GetSuscriptionsQuery)
export class GetSuscriptionsHandler implements IQueryHandler<GetSuscriptionsQuery>
{
    constructor() {}
    async execute(query: GetSuscriptionsQuery): Promise<any> {
        const manager = getManager();
        const sql = `
        SELECT
         s.id,
         s.cost,
         s.active,
         s.time_suscription_days,
         s.type_suscription
        FROM
         suscriptions s`;
        const ormSuscriptions = await manager.query(sql);
        if (ormSuscriptions.length <= 0) { return []; }

        const suscriptions: GetSuscriptionsDto[] = ormSuscriptions.map(function (ormSuscription)
        {
            let suscriptionDto = new GetSuscriptionsDto();
            suscriptionDto.id = Number(ormSuscription.id);
            suscriptionDto.cost = Number(ormSuscription.cost);
            suscriptionDto.active = ormSuscription.active;
            suscriptionDto.timeSuscription = ormSuscription.time_suscription_days;
            suscriptionDto.typeSuscription = ormSuscription.type_suscription;
            return suscriptionDto;
        });
        return suscriptions;
    }
}
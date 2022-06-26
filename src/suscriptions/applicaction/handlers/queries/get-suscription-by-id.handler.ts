import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetSuscriptionsDto } from '../../dtos/queries/get-suscriptions.dto';
import { GetSuscriptionByIdQuery } from '../../queries/get-suscription-by-id.query';

@QueryHandler(GetSuscriptionByIdQuery)
export class GetSuscriptionByIdHandler implements IQueryHandler<GetSuscriptionByIdQuery>
{
    constructor() {}

    async execute(query: GetSuscriptionByIdQuery): Promise<any> {
        const manager = getManager();
        const sql = `
        SELECT
         s.id,
         s.cost,
         s.active,
         s.time_suscription_days,
         s.type_suscription
        FROM
         suscriptions s
        WHERE
         s.id = ?;`;
        const ormSuscriptions = await manager.query(sql, [query.suscriptionId]);
        if (ormSuscriptions.length <= 0) {return {};}
        const ormSuscription = ormSuscriptions[0];
        let suscriptionDto = new GetSuscriptionsDto();
        suscriptionDto.id = Number(ormSuscription.id);
        suscriptionDto.cost = Number(ormSuscription.cost);
        suscriptionDto.active = ormSuscription.active;
        suscriptionDto.timeSuscription = ormSuscription.time_suscription_days;
        suscriptionDto.typeSuscription = ormSuscription.type_suscription;
        return suscriptionDto;
    }
}
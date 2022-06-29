import { GetCustomersCompanyQuery } from '../../queries/get-customers-company.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { GetCustomersCompanyDto } from '../../dtos/queries/get-customers-company.dto';

@QueryHandler(GetCustomersCompanyQuery)
export class GetCustomersCompanyHandler implements IQueryHandler<GetCustomersCompanyQuery> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetCustomersCompanyQuery) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      company_name as companyName,
      ruc
    FROM 
      clients
    WHERE
      type = 'C'
    ORDER BY
      company_name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetCustomersCompanyDto[] = ormCustomers.map(function (ormCustomer) {
      let customerDto = new GetCustomersCompanyDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.companyName = ormCustomer.companyName;
      customerDto.ruc = ormCustomer.ruc;
      return customerDto;
    });
    return customers;
  }
}
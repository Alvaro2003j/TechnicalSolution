import { SqlReader } from "node-sql-reader";
import { MigrationInterface, QueryRunner } from "typeorm"

export class NewInitialSchema1656198251403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '/new-initial-schema.sql';
        let queries = SqlReader.readSqlFile(path);
        for (let query of queries)
        {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

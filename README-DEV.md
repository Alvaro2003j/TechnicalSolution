# ACME Banking

## Description

Domain-Driven Design example using [Nest](https://github.com/nestjs/nest) framework.
Persistence layer is implemented using [TypeORM](https://typeorm.io/) with MySQL Database.
Object Mapping is based on [AutoMapper TypeScript](https://automapperts.netlify.app/).

## Requisites

- https://dev.mysql.com/downloads/mysql
- https://www.mysql.com/products/workbench
- https://nestjs.com/

## Install NestJS

```
$ npm i -g @nestjs/cli
$ nest --version
```

## Install Dependencies

```
$ npm i --save typeorm reflect-metadata mysql2
$ npm i --save @nestjs/typeorm @nestjs/cqrs
$ npm i --save typescript-result moment-timezone node-sql-reader
$ npm i @automapper/core @automapper/classes @automapper/nestjs @automapper/types
```

## Install Dev Dependencies

```
$ npm i --save-dev ts-node @types/node npm-run-all
```

## Scripts at package.json

Add typeorm command under scripts section in package.json

```
"scripts": {
    ...
    "typeorm": "typeorm-ts-node-commonjs"
}
```

## Create a module

```
$ nest g resource customers
```

## Environment variables

```
BANKING_DDD_NEST_MYSQL=mysql://{user}:{password}@{host}:{port}/{database}
BANKING_DDD_NEST_MYSQL=mysql://root:admin@localhost:3306/banking-ddd-nest
ENVIRONMENT=local
ENVIRONMENT=prod
```

Note: Password must be URL encoded, %25 is the url encoding of %.

## Fix issue with MySQL 8

Client does not support authentication protocol requested by server; consider upgrading MySQL client.
To fix it, run the following command changing the values with your credentials:

```
ALTER USER '{user}'@'{host}' IDENTIFIED WITH mysql_native_password BY '{password}'
FLUSH PRIVILEGES;
```

### Example:

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
FLUSH PRIVILEGES;
```

## Migrations

```
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/InitialSchema
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/MasterData
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/UserEmailUpdate
$ npm run typeorm migration:create ./src/common/infrastructure/migrations/UserEmailReupdate
```

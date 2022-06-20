# ACME Banking

## Description
Domain-Driven Design example using [Nest](https://github.com/nestjs/nest) framework.
Persistence layer is implemented using [TypeORM](https://typeorm.io/) with MySQL Database.
Object Mapping is based on [AutoMapper TypeScript](https://automapperts.netlify.app/).

## Installation

```bash
$ npm i -g @nestjs/cli
$ nest --version
$ npm install
```

## Generating the dist folder
```bash
$ npm run build
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment variables

```
ENVIRONMENT
BANKING_DDD_NEST_MYSQL
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
TypeORM is [MIT licensed](https://github.com/typeorm/typeorm/blob/master/LICENSE)
AutoMapper TypeScript [MIT licensed](https://github.com/nartc/mapper/blob/main/LICENSE).
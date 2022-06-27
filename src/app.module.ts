import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { SuscriptionsModule } from './suscriptions/suscriptions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsModule } from './requests/request.module';
import { PaymentsModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { ClaimsModule } from './claim/claims.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      url: process.env.TECHNICAL_SOLUTION,
      migrationsRun: true,
      logging: true,
      timezone: '+00:00',
      bigNumberStrings: false,
      entities: [
        process.env.ENVIRONMENT == 'prod' ? 
        '**/infrastructure/persistence/typeorm/entities/*{.ts,.js}' : 
        'dist/**/infrastructure/persistence/typeorm/entities/*{.ts,.js}'
      ],
      subscribers: [],
      migrations: [
        process.env.ENVIRONMENT == 'prod' ? 
        'common/infrastructure/persistence/typeorm/migrations/*{.ts,.js}' : 
        'dist/common/infrastructure/persistence/typeorm/migrations/*{.ts,.js}'
      ],
      migrationsTableName: "migrations"
    }),
    ClientsModule,
    SuscriptionsModule,
    ClaimsModule,
    PaymentsModule,
    RequestsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
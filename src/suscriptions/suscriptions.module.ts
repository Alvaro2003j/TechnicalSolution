import { Module } from '@nestjs/common';
import { SuscriptionController } from './api/suscriptions.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';
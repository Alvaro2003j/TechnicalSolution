import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';

@Controller('suscriptions')
export class SuscriptionController {
    constructor(
       private readonly suscriptionApplicationService: 
       private readonly queryBus: QueryBus
    ) {}
}

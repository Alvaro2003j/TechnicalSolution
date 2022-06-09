import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('suscriptions')
export class SuscriptionController {
    constructor(
       private
       private readonly queryBus: QueryBus
    ) {}
}

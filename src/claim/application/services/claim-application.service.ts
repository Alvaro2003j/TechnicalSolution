import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";


@Injectable()
export class ClaimApplicationService{
    constructor(
        private commandBus: CommandBus,
        

    ){}
}
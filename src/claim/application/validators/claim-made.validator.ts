import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountTypeORM } from "src/accounts/infrastructure/persistence/typeorm/entities/account.typeorm";
import { AccountIdTypeORM } from "src/accounts/infrastructure/persistence/typeorm/value-objects/account-id.typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ClaimMadeValidator{
    constructor(@InjectRepository(AccountIdTypeORM) private accountRepository: Repository<AccountTypeORM> ) {}

    public async validate(){
        
    }
}
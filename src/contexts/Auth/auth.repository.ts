import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { UserCredentialsEntity } from "./entities/user-credentials.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IAuthRepository } from "./auth.repository.interface";

@Injectable()
export class AuthRepository implements IAuthRepository{
    constructor(
        @InjectRepository(UserCredentialsEntity) private readonly credentialRepository: Repository<UserCredentialsEntity>
    ){}
    async findCredentialByEmail(email: string) : Promise <UserCredentialsEntity | null>{
        const entity = await this.credentialRepository.findOne({
            where: { email }
        })


        const test = this.credentialRepository.create({
            email: 'eeeeee'
        })
        
        await this.credentialRepository.save(test)
        return entity
    }
}
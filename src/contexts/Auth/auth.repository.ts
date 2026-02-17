import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCredentialsEntity } from './entities/user-credentials.entity';
import { IAuthRepository } from './auth.repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
        @InjectRepository(UserCredentialsEntity)
        private readonly userCredentialsRepo: Repository<UserCredentialsEntity>,
    ) {}

    async findCredentialByEmail(email: string): Promise<UserCredentialsEntity | null> {
        return this.userCredentialsRepo.findOne({ where: { email } });
    }

    async findById(id: string): Promise<UserCredentialsEntity | null> {
        return this.userCredentialsRepo.findOne({ where: { id } });
    }

    async createCredential(data: Partial<UserCredentialsEntity>): Promise<UserCredentialsEntity> {
        const credential = this.userCredentialsRepo.create(data);
        return this.userCredentialsRepo.save(credential);
    }

    async checkEmailExists(email: string): Promise<boolean> {
        const count = await this.userCredentialsRepo.count({ where: { email } });
        return count > 0;
    }

    async updatePermissions(id: string, permissions: bigint): Promise<UserCredentialsEntity> {
        await this.userCredentialsRepo.update(id, { permissions });
        return this.userCredentialsRepo.findOneOrFail({ where: { id } });
    }
}
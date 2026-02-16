import { UserCredentialsEntity } from "./entities/user-credentials.entity";

export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

export interface IAuthRepository {
    findCredentialByEmail(email: string): Promise<UserCredentialsEntity | null>;
    createCredential(data: Partial<UserCredentialsEntity>): Promise<UserCredentialsEntity>;
    checkEmailExists(email: string): Promise<boolean>;
}
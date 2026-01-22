import { UserCredentialsEntity } from "./entities/user-credentials.entity";


export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY')

export interface IAuthRepository{
    findCredentialByEmail(email: String) : Promise <UserCredentialsEntity | null>


    
}
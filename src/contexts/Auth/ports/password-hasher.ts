export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER')

export interface PasswordHashPort{
    hash(password:string) : Promise<string>
    compare(password: string , passwordHash: string) : Promise<Boolean>

}
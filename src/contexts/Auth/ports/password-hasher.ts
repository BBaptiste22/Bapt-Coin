export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER');

export interface IPasswordHasherPort {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
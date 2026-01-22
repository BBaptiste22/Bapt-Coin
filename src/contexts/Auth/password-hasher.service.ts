import { Injectable } from "@nestjs/common";
import { PasswordHashPort } from "./ports/password-hasher";
import * as bcrypt from 'bcrypt'

@Injectable()

export class PasswordHasherService implements PasswordHashPort{
    hash(password: string): Promise<string> {
        return bcrypt.hash(password , 12 )
    }
    compare(password: string, passwordHash: string): Promise<Boolean> {
        return bcrypt.compare(password, passwordHash)
    }
    
}
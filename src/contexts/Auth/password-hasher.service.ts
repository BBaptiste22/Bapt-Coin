import { Injectable } from "@nestjs/common";
import { IPasswordHasherPort } from "./ports/password-hasher";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService implements IPasswordHasherPort {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
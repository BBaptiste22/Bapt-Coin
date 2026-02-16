import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import { JWTTokenPort } from "./ports/jwt";

@Injectable()
export class TokenJwtService implements JWTTokenPort {
    private readonly secret = '512821781512217718178122177182'; // À mettre dans les variables d'environnement

    async generateToken(payload: object, expiresIn?: string | number): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.secret, { expiresIn: expiresIn || '12000s' }, (err, token) => {
                if (err) reject(err);
                else resolve(token as string);
            });
        });
    }

    async verifyToken(token: string): Promise<object | null> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, decoded) => {
                if (err) reject(err);
                else resolve((decoded as object) || null);
            });
        });
    }
}
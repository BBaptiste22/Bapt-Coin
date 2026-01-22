import { Injectable } from "@nestjs/common";
import { PasswordHashPort } from "./ports/password-hasher";
import * as jwt from 'jsonwebtoken'
import { JWTTokenPort } from "./ports/jwt";

//const jwt = require('jsonwebtoken');
@Injectable()

export class TokenJwtService implements JWTTokenPort {
    generateToken(payload: object): Promise<string> {
        return jwt.sign({ payload} )
    }
    verifyToken(token: string): Promise<object | null> {
        return jwt.verify({ token } )
    }
    verifyAccessToken(token: string): Promise<object | null> {
        return jwt.verify({ token} ) 
    }   
}
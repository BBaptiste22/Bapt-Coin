export const JWT_TOKEN_SERVICE = Symbol('JWT_TOKEN_SERVICE');

export interface JWTTokenPort {
    generateToken(payload: object, expiresIn?: string | number): Promise<string>;
    verifyToken(token: string): Promise<object | null>;
}
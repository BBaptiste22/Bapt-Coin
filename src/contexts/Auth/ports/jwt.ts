export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface JWTTokenPort {
    generateToken(payload: object): Promise<string>;
    verifyToken(token: string): Promise<object | null>;
    verifyAccessToken(token: string): Promise<object | null>;
}
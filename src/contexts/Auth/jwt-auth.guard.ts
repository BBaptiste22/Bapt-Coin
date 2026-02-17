import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenJwtService } from './token-jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly tokenService: TokenJwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token manquant');
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = await this.tokenService.verifyToken(token);
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Token invalide ou expiré');
        }
    }
}
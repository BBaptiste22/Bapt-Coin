import { CanActivate, ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { hasAll } from './Permissions.utils';
import { PERMISSIONS_KEY } from './require-permissions';


@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const required = this.reflector.getAllAndOverride<bigint>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);


        if (!required) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user) throw new UnauthorizedException('Non authentifié');

        const userPerms = BigInt(user.permissions ?? 0);

        if (!hasAll(userPerms, required)) {
            throw new ForbiddenException('Permissions insuffisantes');
        }

        return true;
    }
}
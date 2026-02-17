import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (...perms: bigint[]) =>
    SetMetadata(PERMISSIONS_KEY, perms.reduce((acc, p) => acc | p, 0n));
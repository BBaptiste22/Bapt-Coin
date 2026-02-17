export const Permissions = {
    // User
    USER_READ:     1n << 0n,   // 1
    USER_WRITE:    1n << 1n,   // 2
    USER_DELETE:   1n << 2n,   // 4

    // Coin
    COIN_READ:     1n << 6n,   // 64
    COIN_WRITE:    1n << 7n,   // 128


} as const;

export const DEFAULT_PERMISSIONS = Permissions.USER_READ | Permissions.COIN_READ;
export const DEFAULT_ADMIN_PERMISSIONS = Permissions.USER_READ | Permissions.USER_WRITE | Permissions.USER_DELETE | Permissions.COIN_READ | Permissions.COIN_WRITE;


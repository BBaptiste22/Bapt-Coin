export const add     = (m: bigint, p: bigint): bigint => m | p;
export const remove  = (m: bigint, p: bigint): bigint => m & ~p;
export const has     = (m: bigint, p: bigint): boolean => (m & p) !== 0n;
export const hasAll  = (m: bigint, p: bigint): boolean => (m & p) === p;
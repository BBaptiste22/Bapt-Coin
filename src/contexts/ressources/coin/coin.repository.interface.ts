import { Coin } from "./entities/coin.entity";

export const COIN_REPOSITORY = Symbol('COIN_REPOSITORY');

export interface CoinFilter {
    name?: string;
    nationality?: string;
    minValue?: number;
    maxValue?: number;
}

export interface PaginationOptions {
    page: number;
    limit: number;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ICoinRepository {

    addCoin(name: string, description: string, value: string, quantity: string, nationality: string, release: Date): Promise<Coin>;

    findById(id: string): Promise<Coin | null>;
    findCoinByName(name: string): Promise<Coin | null>;
    findAll(filter?: CoinFilter, pagination?: PaginationOptions): Promise<PaginatedResult<Coin>>;

    updateCoin(id: string, data: Partial<Coin>): Promise<Coin>;

    deleteCoin(id: string): Promise<void>;
}
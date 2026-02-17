import { Inject, Injectable } from '@nestjs/common';
import { type ICoinRepository, CoinFilter, PaginationOptions, PaginatedResult } from './coin.repository.interface';
import { COIN_REPOSITORY } from './coin.repository.interface';
import { Coin } from './entities/coin.entity';
import { CoinAlreadyExistsError, CoinNotFoundError } from './errors/coin.error';

@Injectable()
export class CoinService {
    constructor(
        @Inject(COIN_REPOSITORY) private readonly coinRepo: ICoinRepository,
    ) {}

    async createCoin(name: string, description: string, value: string, quantity: string, nationality: string, release: Date): Promise<Coin> {
        const existing = await this.coinRepo.findCoinByName(name);
        if (existing) throw new CoinAlreadyExistsError(
            { name: [`Une coin avec le nom "${name}" existe déjà`] },
            { name }
        );
        return await this.coinRepo.addCoin(name, description, value, quantity, nationality, release);
    }

    async getCoinById(id: string): Promise<Coin> {
        const coin = await this.coinRepo.findById(id);
        if (!coin) throw new CoinNotFoundError(
            { id: [`Aucune coin avec l'id ${id}`] },
            { id }
        );
        return coin;
    }

    async getAllCoins(filter?: CoinFilter, pagination?: PaginationOptions): Promise<PaginatedResult<Coin>> {
        return await this.coinRepo.findAll(filter, pagination);
    }

    async updateCoin(id: string, data: Partial<Coin>): Promise<Coin> {
        const coin = await this.coinRepo.findById(id);
        if (!coin) throw new CoinNotFoundError(
            { id: [`Aucune coin avec l'id ${id}`] },
            { id }
        );
        return await this.coinRepo.updateCoin(id, data);
    }

    async deleteCoin(id: string): Promise<void> {
        const coin = await this.coinRepo.findById(id);
        if (!coin) throw new CoinNotFoundError(
            { id: [`Aucune coin avec l'id ${id}`] },
            { id }
        );
        return await this.coinRepo.deleteCoin(id);
    }
}
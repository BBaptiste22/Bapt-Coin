import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository, ILike, Between, FindOptionsWhere } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ICoinRepository, CoinFilter, PaginationOptions, PaginatedResult } from "./coin.repository.interface";
import { Coin } from "./entities/coin.entity";

@Injectable()
export class CoinRepository implements ICoinRepository {
    constructor(
        @InjectRepository(Coin) private readonly coinRepo: Repository<Coin>
    ) {}

    async addCoin(name: string, description: string, value: string, quantity: string, nationality: string, release: Date): Promise<Coin> {
        const coin = this.coinRepo.create({
            name,
            description,
            value,
            quantity,
            nationality: { id: nationality },
            release,
        });
        return await this.coinRepo.save(coin);
    }

    async findById(id: string): Promise<Coin | null> {
        return await this.coinRepo.findOne({
            where: { id },
            relations: ['nationality'],
        });
    }

    async findCoinByName(name: string): Promise<Coin | null> {
        return await this.coinRepo.findOne({
            where: { name },
            relations: ['nationality'],
        });
    }

    async findAll(filter?: CoinFilter, pagination?: PaginationOptions): Promise<PaginatedResult<Coin>> {
        const where: FindOptionsWhere<Coin> = {};

        if (filter?.name) {
            where.name = ILike(`%${filter.name}%`);
        }

        if (filter?.nationality) {
            where.nationality = { id: filter.nationality };
        }

        const page = pagination?.page ?? 1;
        const limit = pagination?.limit ?? 10;
        const skip = (page - 1) * limit;

        const [data, total] = await this.coinRepo.findAndCount({
            where,
            relations: ['nationality'],
            skip,
            take: limit,
            order: { release: 'DESC' },
        });

        return {
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async updateCoin(id: string, data: Partial<Coin>): Promise<Coin> {
        const coin = await this.findById(id);
        if (!coin) throw new NotFoundException(`Coin ${id} introuvable`);

        Object.assign(coin, data);
        return await this.coinRepo.save(coin);
    }

    async deleteCoin(id: string): Promise<void> {
        const coin = await this.findById(id);
        if (!coin) throw new NotFoundException(`Coin ${id} introuvable`);
        await this.coinRepo.remove(coin);
    }
}
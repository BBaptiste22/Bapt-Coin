import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Collection } from "./entities/collection.entity";
import { ICollectionRepository } from "./collection.repository.interface";

@Injectable()
export class CollectionRepository implements ICollectionRepository {
    constructor(
        @InjectRepository(Collection)
        private readonly collectionRepo: Repository<Collection>,
    ) {}

    async create(name: string, userId: string): Promise<Collection> {
        const collection = this.collectionRepo.create({ name, userId });
        return this.collectionRepo.save(collection);
    }

    async findById(id: string): Promise<Collection | null> {
        return this.collectionRepo.findOne({
            where: { id },
            relations: ['coins', 'coins.nationality'],
        });
    }

    async findByUserId(userId: string): Promise<Collection[]> {
        return this.collectionRepo.find({
            where: { userId },
            relations: ['coins', 'coins.nationality'],
        });
    }

    async delete(id: string): Promise<void> {
        const collection = await this.findById(id);
        if (collection) await this.collectionRepo.remove(collection);
    }

    async addCoin(collectionId: string, coinId: string): Promise<Collection> {
        const collection = await this.findById(collectionId);
        if (!collection) throw new Error('Collection introuvable');

        collection.coins = [...(collection.coins ?? []), { id: coinId } as any];
        return this.collectionRepo.save(collection);
    }

    async removeCoin(collectionId: string, coinId: string): Promise<Collection> {
        const collection = await this.findById(collectionId);
        if (!collection) throw new Error('Collection introuvable');

        collection.coins = (collection.coins ?? []).filter(c => c.id !== coinId);
        return this.collectionRepo.save(collection);
    }
}
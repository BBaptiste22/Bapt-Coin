import { Inject, Injectable } from '@nestjs/common';
import { COLLECTION_REPOSITORY, type ICollectionRepository } from './collection.repository.interface';
import { Collection } from './entities/collection.entity';
import {
    CollectionNotFoundError,
    CoinAlreadyInCollectionError,
    CoinNotInCollectionError,
} from './error/collection.errors';

@Injectable()
export class CollectionService {
    constructor(
        @Inject(COLLECTION_REPOSITORY)
        private readonly collectionRepo: ICollectionRepository,
    ) {}

    async createCollection(name: string, userId: string): Promise<Collection> {
        return await this.collectionRepo.create(name, userId);
    }

    async getMyCollections(userId: string): Promise<Collection[]> {
        return await this.collectionRepo.findByUserId(userId);
    }

    async getCollectionById(id: string, userId: string): Promise<Collection> {
        const collection = await this.collectionRepo.findById(id);
        if (!collection) throw new CollectionNotFoundError(
            { id: [`Aucune collection avec l'id ${id}`] },
            { id }
        );
        if (collection.userId !== userId) throw new CollectionNotFoundError(
            { id: ["Cette collection ne vous appartient pas"] },
            { id }
        );
        return collection;
    }

    async deleteCollection(id: string, userId: string): Promise<void> {
        const collection = await this.collectionRepo.findById(id);
        if (!collection) throw new CollectionNotFoundError(
            { id: [`Aucune collection avec l'id ${id}`] },
            { id }
        );
        if (collection.userId !== userId) throw new CollectionNotFoundError(
            { id: ["Cette collection ne vous appartient pas"] },
            { id }
        );
        await this.collectionRepo.delete(id);
    }

    async addCoin(collectionId: string, coinId: string, userId: string): Promise<Collection> {
        const collection = await this.collectionRepo.findById(collectionId);
        if (!collection) throw new CollectionNotFoundError(
            { id: [`Aucune collection avec l'id ${collectionId}`] },
            { id: collectionId }
        );
        if (collection.userId !== userId) throw new CollectionNotFoundError(
            { id: ["Cette collection ne vous appartient pas"] },
            { id: collectionId }
        );
        const alreadyIn = collection.coins?.some(c => c.id === coinId);
        if (alreadyIn) throw new CoinAlreadyInCollectionError(
            { coinId: ["Cette coin est déjà dans la collection"] },
            { coinId }
        );
        return await this.collectionRepo.addCoin(collectionId, coinId);
    }

    async removeCoin(collectionId: string, coinId: string, userId: string): Promise<Collection> {
        const collection = await this.collectionRepo.findById(collectionId);
        if (!collection) throw new CollectionNotFoundError(
            { id: [`Aucune collection avec l'id ${collectionId}`] },
            { id: collectionId }
        );
        if (collection.userId !== userId) throw new CollectionNotFoundError(
            { id: ["Cette collection ne vous appartient pas"] },
            { id: collectionId }
        );
        const inCollection = collection.coins?.some(c => c.id === coinId);
        if (!inCollection) throw new CoinNotInCollectionError(
            { coinId: ["Cette coin n'est pas dans la collection"] },
            { coinId }
        );
        return await this.collectionRepo.removeCoin(collectionId, coinId);
    }
}
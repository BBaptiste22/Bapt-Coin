import { Collection } from "./entities/collection.entity";

export const COLLECTION_REPOSITORY = Symbol('COLLECTION_REPOSITORY');

export interface ICollectionRepository {
    create(name: string, userId: string): Promise<Collection>;
    findById(id: string): Promise<Collection | null>;
    findByUserId(userId: string): Promise<Collection[]>;
    delete(id: string): Promise<void>;
    addCoin(collectionId: string, coinId: string): Promise<Collection>;
    removeCoin(collectionId: string, coinId: string): Promise<Collection>;
}
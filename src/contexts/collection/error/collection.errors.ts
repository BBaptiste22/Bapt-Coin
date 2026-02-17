import { DomainError } from "src/core/errors/domain.error";

export class CollectionNotFoundError extends DomainError {
    constructor(
        fields?: { id?: string[] },
        details?: { id?: string },
    ) {
        super({
            code: 'COLLECTION_NOT_FOUND',
            message: 'Collection introuvable',
            statusCode: 404,
            fields: fields ?? { id: ["Cette collection n'existe pas"] },
            details: {},
        });
    }
}

export class CollectionAlreadyExistsError extends DomainError {
    constructor(
        fields?: { name?: string[] },
        details?: { name?: string },
    ) {
        super({
            code: 'COLLECTION_ALREADY_EXISTS',
            message: 'Cette collection existe déjà',
            statusCode: 409,
            fields: fields ?? { name: ["Une collection avec ce nom existe déjà"] },
            details: {},
        });
    }
}

export class CoinAlreadyInCollectionError extends DomainError {
    constructor(
        fields?: { coinId?: string[] },
        details?: { coinId?: string },
    ) {
        super({
            code: 'COIN_ALREADY_IN_COLLECTION',
            message: 'Cette coin est déjà dans la collection',
            statusCode: 409,
            fields: fields ?? { coinId: ["Cette coin est déjà présente dans la collection"] },
            details: {},
        });
    }
}

export class CoinNotInCollectionError extends DomainError {
    constructor(
        fields?: { coinId?: string[] },
        details?: { coinId?: string },
    ) {
        super({
            code: 'COIN_NOT_IN_COLLECTION',
            message: 'Cette coin n\'est pas dans la collection',
            statusCode: 404,
            fields: fields ?? { coinId: ["Cette coin n'est pas dans la collection"] },
            details : {},
        });
    }
}
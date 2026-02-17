import { DomainError } from "src/core/errors/domain.error";

export class CoinNotFoundError extends DomainError {
    constructor(
        fields?: { id?: string[] },
        details?: { id?: string },
    ) {
        super({
            code: 'COIN_NOT_FOUND',
            message: 'Coin introuvable',
            statusCode: 404,
            fields: fields ?? { id: ["Cette coin n'existe pas"] },
            details: {},
        });
    }
}

export class CoinAlreadyExistsError extends DomainError {
    constructor(
        fields?: { name?: string[] },
        details?: { name?: string },
    ) {
        super({
            code: 'COIN_ALREADY_EXISTS',
            message: 'Cette coin existe déjà',
            statusCode: 409,
            fields: fields ?? { name: ["Une coin avec ce nom existe déjà"] },
            details: {},

        });
    }
}

export class CoinInvalidDataError extends DomainError {
    constructor(
        fields?: { name?: string[]; value?: string[]; quantity?: string[] },
        details?: { name?: string; value?: string; quantity?: string },
    ) {
        super({
            code: 'COIN_INVALID_DATA',
            message: 'Les données de la coin sont invalides',
            statusCode: 400,
            fields: fields ?? { name: ["Les données sont invalides"] },
            details:{},
        });
    }
}
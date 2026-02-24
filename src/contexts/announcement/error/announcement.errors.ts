import { DomainError } from "src/core/errors/domain.error";

export class AnnouncementNotFoundError extends DomainError {
    constructor(fields?: { id?: string[] }, details?: { id?: string }) {
        super({
            code: 'ANNOUNCEMENT_NOT_FOUND',
            message: 'Annonce introuvable',
            statusCode: 404,
            fields: fields ?? { id: ["Cette annonce n'existe pas"] },
            details: {},
        });
    }
}

export class AnnouncementNotOpenError extends DomainError {
    constructor() {
        super({
            code: 'ANNOUNCEMENT_NOT_OPEN',
            message: 'Cette annonce n\'est plus disponible',
            statusCode: 400,
        });
    }
}

export class TradeTransactionNotFoundError extends DomainError {
    constructor(fields?: { id?: string[] }, details?: { id?: string }) {
        super({
            code: 'TRANSACTION_NOT_FOUND',
            message: 'Transaction introuvable',
            statusCode: 404,
            fields: fields ?? { id: ["Cette transaction n'existe pas"] },
            details: {},
        });
    }
}

export class UnauthorizedActionError extends DomainError {
    constructor() {
        super({
            code: 'UNAUTHORIZED_ACTION',
            message: 'Action non autorisée',
            statusCode: 403,
        });
    }
}
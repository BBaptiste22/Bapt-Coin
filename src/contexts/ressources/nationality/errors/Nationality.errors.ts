import { DomainError } from "src/core/errors/domain.error";

export class NationalityNotFoundError extends DomainError {
    constructor(
        fields?: { id?: string[] },
        details?: { id?: string },
    ) {
        super({
            code: 'NATIONALITY_NOT_FOUND',
            message: 'Nationalité introuvable',
            statusCode: 404,
            fields: fields ?? { id: ["Cette nationalité n'existe pas"] },
            details: {},
        });
    }
}

export class NationalityAlreadyExistsError extends DomainError {
    constructor(
        fields?: { name?: string[] },
        details?: { name?: string },
    ) {
        super({
            code: 'NATIONALITY_ALREADY_EXISTS',
            message: 'Cette nationalité existe déjà',
            statusCode: 409,
            fields: fields ?? { name: ["Une nationalité avec ce nom existe déjà"] },
            details: {},
        });
    }
}
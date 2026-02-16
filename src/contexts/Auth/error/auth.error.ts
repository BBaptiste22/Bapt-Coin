import { DomainError } from "../../../core/errors/domain.error";

export class UserNotFoundError extends DomainError{
    public readonly fields: Record<string, string[]>;
    constructor(params: {
        fields : Record<string, string []>
    }){
        super({
            code: 'USER_NOT_FOUND',
            message: 'user pas la',
            statusCode: 400,
            fields: {},
            details: {},
        })
        this.fields = params.fields
    }
}
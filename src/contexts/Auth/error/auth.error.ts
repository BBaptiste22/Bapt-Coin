import { DomainError } from "../../../core/errors/domain.error";

export class EmailExistError extends DomainError {
    constructor(
        fields?: Record<string, string[]>
    ) {
        super({
            code: "EMAIL_ALREADY_EXIST",
            message: "email déjà lié a un compte",
            statusCode: 400,
            fields: fields ?? {
                email: ["email already exists"]
            },
            details: {}
        })
    }
}


export class AuthReferralCodeNotFoundError extends DomainError {
    constructor(
      details?: { referralCode?: string },
      fields?: Record<string, string[]>,
    ) {
      super({
        code: 'AUTH_REFERRAL_CODE_NOT_FOUND',
        message: 'Referral code not found',
        statusCode: 404,
        fields: fields ?? { referralCode: ['Referral code not found'] },
        details: {},
      });
    }
  }

  export class InvalidCredentialsError extends DomainError {
    constructor() {
      super({
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
        statusCode: 401,
        fields: {
          credentials: ['Invalid email or password'],
        },
        details: {},
      });
    }
  }
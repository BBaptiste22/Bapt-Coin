export const AUTH_REGISTERED_EVENT = Symbol('auth.user.registered')

export interface UserRegisteredPayload {
    email: string;
    id: string;
}

export class userRegisteredEvent {
    static eventName = AUTH_REGISTERED_EVENT

    static create(payload: UserRegisteredPayload) {
        return {
            name: userRegisteredEvent.eventName,
            payload
        }
    }
}
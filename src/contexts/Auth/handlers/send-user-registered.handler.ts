import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MailerService } from '../../../core/mailer/MailerService';
import { AUTH_REGISTERED_EVENT,type UserRegisteredPayload } from 'src/contexts/Auth/events/user-registrered.event';

@Injectable()
export class UserRegisteredHandler {
    constructor(private readonly mailerService: MailerService) {}

    @OnEvent(AUTH_REGISTERED_EVENT)
    async handle(payload: UserRegisteredPayload): Promise<void> {
        await this.mailerService.sendWelcomeMail(payload.email);
    }
}
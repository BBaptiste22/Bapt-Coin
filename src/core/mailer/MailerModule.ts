import { Module } from '@nestjs/common';
import { MailerService } from './MailerService';
import { UserRegisteredHandler } from 'src/contexts/Auth/handlers/send-user-registered.handler';

@Module({
    providers: [MailerService, UserRegisteredHandler],
})
export class NotificationsModule {}
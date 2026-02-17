import { Module } from '@nestjs/common';
import { MailerService } from './MailerService';
import { UserRegisteredHandler } from './handler/UserRegisteredEvent';

@Module({
    providers: [MailerService, UserRegisteredHandler],
})
export class NotificationsModule {}
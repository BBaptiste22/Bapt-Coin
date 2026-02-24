import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';
import { ANNOUNCEMENT_REPOSITORY } from './announcement.repository.interface';
import { AnnouncementRepository } from './announcement.repository';
import { authModule } from 'src/contexts/Auth/auth.module';
import { Announcement } from './entity/announcement.entity';
import { AnnouncementCoin } from './entity/announcement-coin.entity';
import { TradeTransaction } from './entity/trade-transaction.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Announcement, AnnouncementCoin, TradeTransaction]),
        authModule,
    ],
    controllers: [AnnouncementController],
    providers: [
        AnnouncementService,
        { provide: ANNOUNCEMENT_REPOSITORY, useClass: AnnouncementRepository },
    ],
})
export class AnnouncementModule {}
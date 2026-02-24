import { Inject, Injectable } from '@nestjs/common';
import { ANNOUNCEMENT_REPOSITORY, type IAnnouncementRepository } from './announcement.repository.interface';

import { AnnouncementNotFoundError, AnnouncementNotOpenError, TradeTransactionNotFoundError, UnauthorizedActionError } from './error/announcement.errors';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementCoin, CoinType } from './entity/announcement-coin.entity';
import { Announcement, AnnouncementStatus } from './entity/announcement.entity';
import { TradeTransaction, TradeTransactionStatus } from './entity/trade-transaction.entity';

@Injectable()
export class AnnouncementService {
    constructor(
        @Inject(ANNOUNCEMENT_REPOSITORY)
        private readonly announcementRepo: IAnnouncementRepository,
        @InjectRepository(AnnouncementCoin)
        private readonly announcementCoinRepo: Repository<AnnouncementCoin>,
    ) {}

    async createAnnouncement(title: string, description: string, offeredCoins: string[], wantedCoins: string[], price: string | undefined, creatorId: string): Promise<Announcement> {
        const announcement = await this.announcementRepo.create({
            title,
            description,
            price,
            creatorId,
        });

        for (const coinId of offeredCoins) {
            await this.announcementCoinRepo.save({
                announcementId: announcement.id,
                coinId,
                type: CoinType.OFFERED,
            });
        }

        for (const coinId of wantedCoins) {
            await this.announcementCoinRepo.save({
                announcementId: announcement.id,
                coinId,
                type: CoinType.WANTED,
            });
        }

        const result = await this.announcementRepo.findById(announcement.id);
        if (!result) throw new AnnouncementNotFoundError();
        return result;
    }

    async getAllAnnouncements(): Promise<Announcement[]> {
        return this.announcementRepo.findAll();
    }

    async getMyAnnouncements(creatorId: string): Promise<Announcement[]> {
        return this.announcementRepo.findByCreatorId(creatorId);
    }

    async deleteAnnouncement(id: string, userId: string): Promise<void> {
        const announcement = await this.announcementRepo.findById(id);
        if (!announcement) throw new AnnouncementNotFoundError({ id: [`Annonce ${id} introuvable`] }, { id });
        if (announcement.creatorId !== userId) throw new UnauthorizedActionError();
        await this.announcementRepo.delete(id);
    }

    async acceptAnnouncement(id: string, acceptorId: string): Promise<TradeTransaction> {
        const announcement = await this.announcementRepo.findById(id);
        if (!announcement) throw new AnnouncementNotFoundError({ id: [`Annonce ${id} introuvable`] }, { id });
        if (announcement.status !== AnnouncementStatus.OPEN) throw new AnnouncementNotOpenError();
        if (announcement.creatorId === acceptorId) throw new UnauthorizedActionError();

        await this.announcementRepo.update(id, { status: AnnouncementStatus.ACCEPTED });
        return this.announcementRepo.createTransaction(id, acceptorId);
    }

    async confirmTransaction(transactionId: string, userId: string): Promise<TradeTransaction> {
        const transaction = await this.announcementRepo.findTransactionById(transactionId);
        if (!transaction) throw new TradeTransactionNotFoundError({ id: [`Transaction ${transactionId} introuvable`] }, { id: transactionId });

        const isCreator = transaction.announcement.creatorId === userId;
        const isAcceptor = transaction.acceptorId === userId;

        if (!isCreator && !isAcceptor) throw new UnauthorizedActionError();

        let newStatus: string;

        if (isCreator && transaction.status === TradeTransactionStatus.PENDING) {
            newStatus = TradeTransactionStatus.CONFIRMED_BY_CREATOR;
        } else if (isCreator && transaction.status === TradeTransactionStatus.CONFIRMED_BY_ACCEPTOR) {
            newStatus = TradeTransactionStatus.COMPLETED;
            await this.announcementRepo.update(transaction.announcementId, { status: AnnouncementStatus.COMPLETED });
        } else if (isAcceptor && transaction.status === TradeTransactionStatus.PENDING) {
            newStatus = TradeTransactionStatus.CONFIRMED_BY_ACCEPTOR;
        } else if (isAcceptor && transaction.status === TradeTransactionStatus.CONFIRMED_BY_CREATOR) {
            newStatus = TradeTransactionStatus.COMPLETED;
            await this.announcementRepo.update(transaction.announcementId, { status: AnnouncementStatus.COMPLETED });
        } else {
            throw new UnauthorizedActionError();
        }

        return this.announcementRepo.updateTransaction(transactionId, newStatus);
    }
}
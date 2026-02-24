import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IAnnouncementRepository } from "./announcement.repository.interface";
import { Announcement, AnnouncementStatus } from "./entity/announcement.entity";
import { TradeTransaction, TradeTransactionStatus } from "./entity/trade-transaction.entity";
import { AnnouncementCoin } from "./entity/announcement-coin.entity";

@Injectable()
export class AnnouncementRepository implements IAnnouncementRepository {
    constructor(
        @InjectRepository(Announcement)
        private readonly announcementRepo: Repository<Announcement>,
        @InjectRepository(TradeTransaction)
        private readonly transactionRepo: Repository<TradeTransaction>,
        @InjectRepository(AnnouncementCoin)
        private readonly announcementCoinRepo: Repository<AnnouncementCoin>,
    ) {}

    async create(data: Partial<Announcement>): Promise<Announcement> {
        const announcement = this.announcementRepo.create(data);
        return this.announcementRepo.save(announcement);
    }

    async findById(id: string): Promise<Announcement | null> {
        return this.announcementRepo.findOne({
            where: { id },
            relations: ['announcementCoins', 'announcementCoins.coin', 'announcementCoins.coin.nationality', 'creator'],
        });
    }

    async findAll(): Promise<Announcement[]> {
        return this.announcementRepo.find({
            where: { status: AnnouncementStatus.OPEN },
            relations: ['announcementCoins', 'announcementCoins.coin', 'announcementCoins.coin.nationality', 'creator'],
            order: { createdAt: 'DESC' },
        });
    }

    async findByCreatorId(creatorId: string): Promise<Announcement[]> {
        return this.announcementRepo.find({
            where: { creatorId },
            relations: ['announcementCoins', 'announcementCoins.coin', 'announcementCoins.coin.nationality'],
            order: { createdAt: 'DESC' },
        });
    }

    async update(id: string, data: Partial<Announcement>): Promise<Announcement> {
        await this.announcementRepo.update(id, data);
        return this.announcementRepo.findOneOrFail({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        const announcement = await this.findById(id);
        if (announcement) await this.announcementRepo.remove(announcement);
    }

    async createTransaction(announcementId: string, acceptorId: string): Promise<TradeTransaction> {
        const transaction = this.transactionRepo.create({ announcementId, acceptorId, status: TradeTransactionStatus.PENDING });
        return this.transactionRepo.save(transaction);
    }

    async findTransactionById(id: string): Promise<TradeTransaction | null> {
        return this.transactionRepo.findOne({
            where: { id },
            relations: ['announcement', 'announcement.creator', 'acceptor'],
        });
    }

    async findTransactionByAnnouncementId(announcementId: string): Promise<TradeTransaction | null> {
        return this.transactionRepo.findOne({
            where: { announcementId },
            relations: ['announcement', 'announcement.creator', 'acceptor'],
        });
    }

    async updateTransaction(id: string,status: TradeTransactionStatus): Promise<TradeTransaction> {
        await this.transactionRepo.update(id, { status });
        return this.transactionRepo.findOneOrFail({ where: { id } });
    }
}
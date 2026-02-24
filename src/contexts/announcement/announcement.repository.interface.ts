import { Announcement } from "./entity/announcement.entity";
import { TradeTransaction } from "./entity/trade-transaction.entity";


export const ANNOUNCEMENT_REPOSITORY = Symbol('ANNOUNCEMENT_REPOSITORY');

export interface IAnnouncementRepository {
    create(data: Partial<Announcement>): Promise<Announcement>;
    findById(id: string): Promise<Announcement | null>;
    findAll(): Promise<Announcement[]>;
    findByCreatorId(creatorId: string): Promise<Announcement[]>;
    update(id: string, data: Partial<Announcement>): Promise<Announcement>;
    delete(id: string): Promise<void>;
    
    
    createTransaction(announcementId: string, acceptorId: string): Promise<TradeTransaction>;
    findTransactionById(id: string): Promise<TradeTransaction | null>;
    findTransactionByAnnouncementId(announcementId: string): Promise<TradeTransaction | null>;
    updateTransaction(id: string, status: string): Promise<TradeTransaction>;
}
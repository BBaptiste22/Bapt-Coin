import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";
import { Coin } from "src/contexts/ressources/coin/entities/coin.entity";

export enum CoinType {
    OFFERED = 'offered',
    WANTED = 'wanted',
}

@Entity('announcement_coin')
export class AnnouncementCoin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Announcement, a => a.announcementCoins, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'announcement_id' })
    announcement: Announcement;

    @Column({ name: 'announcement_id' })
    announcementId: string;

    @ManyToOne(() => Coin, { eager: true })
    @JoinColumn({ name: 'coin_id' })
    coin: Coin;

    @Column({ name: 'coin_id' })
    coinId: string;

    @Column({ name: 'type', type: 'enum', enum: CoinType })
    type: CoinType;
}
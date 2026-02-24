import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserCredentialsEntity } from "src/contexts/Auth/entities/user-credentials.entity";
import { AnnouncementCoin } from "./announcement-coin.entity";

export enum AnnouncementStatus {
    OPEN = 'OPEN',
    ACCEPTED = 'ACCEPTED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED',
}

@Entity('trade_offer')
export class Announcement {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'title', type: 'varchar', length: 255 })
    title: string;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2, nullable: true })
    price?: number;

    @Column({ name: 'status', type: 'enum', enum: AnnouncementStatus, default: AnnouncementStatus.OPEN })
    status: AnnouncementStatus;

    @ManyToOne(() => UserCredentialsEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'creator_id' })
    creator: UserCredentialsEntity;

    @Column({ name: 'creator_id' })
    creatorId: string;

    @OneToMany(() => AnnouncementCoin, ac => ac.announcement, { cascade: true })
    announcementCoins: AnnouncementCoin[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
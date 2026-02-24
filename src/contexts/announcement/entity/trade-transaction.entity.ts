import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entity";
import { UserCredentialsEntity } from "src/contexts/Auth/entities/user-credentials.entity";

export enum TradeTransactionStatus {
    PENDING = 'pending',
    CONFIRMED_BY_CREATOR = 'confirmed_by_creator',
    CONFIRMED_BY_ACCEPTOR = 'confirmed_by_acceptor',
    COMPLETED = 'completed',
}

@Entity('trade_transaction')
export class TradeTransaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Announcement, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'announcement_id' })
    announcement: Announcement;

    @Column({ name: 'announcement_id' })
    announcementId: string;

    @ManyToOne(() => UserCredentialsEntity, { nullable: false })
    @JoinColumn({ name: 'acceptor_id' })
    acceptor: UserCredentialsEntity;

    @Column({ name: 'acceptor_id' })
    acceptorId: string;

    @Column({ name: 'status', type: 'varchar', default: 'pending' })
    status: TradeTransactionStatus;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
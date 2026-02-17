import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserCredentialsEntity } from "src/contexts/Auth/entities/user-credentials.entity";
import { Coin } from "src/contexts/ressources/coin/entities/coin.entity";

@Entity('collection')
export class Collection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @ManyToOne(() => UserCredentialsEntity, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserCredentialsEntity;

    @Column({ name: 'user_id' })
    userId: string;

    @ManyToMany(() => Coin)
    @JoinTable({
        name: 'collection_coins',
        joinColumn: { name: 'collection_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'coin_id', referencedColumnName: 'id' },
    })
    coins: Coin[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
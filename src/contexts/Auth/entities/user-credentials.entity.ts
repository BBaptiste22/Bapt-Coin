import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { DEFAULT_PERMISSIONS } from "src/core/permissions/permissions";
import { HttpStatus } from "@nestjs/common";

@Entity('user-credentials')
export class UserCredentialsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'password_hash', type: 'varchar', length: 255 })
    password: string;

    @Index({ unique: true })
    @Column({ name: 'email', type: 'varchar', length: 255 })
    email: string;

    @Column({
        name: 'permissions',
        type: 'bigint',
        unsigned: true,
        default: DEFAULT_PERMISSIONS.toString(),
        transformer: {
            to: (value: bigint | undefined) => (value ?? DEFAULT_PERMISSIONS).toString(),
            from: (value: string) => BigInt(value ?? DEFAULT_PERMISSIONS),
        },
    })
    permissions: bigint;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}


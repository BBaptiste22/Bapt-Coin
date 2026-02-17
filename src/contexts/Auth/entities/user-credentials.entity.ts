import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('user-credentials')
export class UserCredentialsEntity{
    @PrimaryGeneratedColumn('uuid')

    id : string;

    @Column({name: 'password_hash', type : 'varchar', length: 255})
    password : String;

    @Index({unique : true})
    @Column({name: 'email', type : 'varchar', length: 255})
    email: string;

    @CreateDateColumn({name : 'created_at'})
    createdAt : Date
    
}


import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('nationality')
export class Nationality{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name: 'name', type : 'varchar', length: 255})
    name : string 

    @Column({name: 'country_code', type : 'varchar', length: 255})
    country_code : string 

    @Column({name: 'flag', type : 'varchar', length: 255})
    flag : string 

    
}

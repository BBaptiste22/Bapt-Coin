
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Nationality } from "../../nationality/entities/nationality.entity";

@Entity('coin')
export class Coin{
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name: 'name', type : 'varchar', length: 255})
    name : string 

    @Column({name: 'description', type : 'varchar', length: 255})
    description : string 

    @Column({name: 'value', type : 'varchar', length: 255})
    value : string
    
    @Column({name: 'quantity'})
    quantity : string 

    @ManyToOne(type => Nationality, nationality  => nationality.name)
    nationality: Nationality[];

    @CreateDateColumn({name :'release'})
    release : Date 
}

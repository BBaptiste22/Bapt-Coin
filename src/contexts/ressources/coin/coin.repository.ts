import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ICoinRepository } from "./coin.repository.interface";
import { Coin } from "./entities/coin.entity";
import { Nationality } from "../nationality/entities/nationality.entity";

@Injectable()
export class CoinRepository implements ICoinRepository{
    constructor(
        @InjectRepository(Coin) private readonly CoinRepository: Repository<Coin>
    ){}
    async findCoinByName(name: string) : Promise <Coin | null>{
        const entity = await this.CoinRepository.findOne({
            where: { name }
        })

        return entity
    }

    async addCoin(name: string, description: string, value: string, quantity: string, nationality: string, release: Date): Promise<Coin> {
    
    const coin = this.CoinRepository.create({
        name, 
        description, 
        value, 
        quantity,
        nationality: { id: nationality }, 
        release
    });

    return await this.CoinRepository.save(coin);
}


}
import { Nationality } from "../nationality/entities/nationality.entity";
import { Coin } from "./entities/coin.entity"



export const COIN_REPOSITORY = Symbol('COIN_REPOSITORY')

export interface ICoinRepository{
    findCoinByName(name: String) : Promise <Coin | null>

    addCoin(name: string, description: string, value: string, quantity: string, nationality:Nationality, release:Date): Promise<Coin>;
}
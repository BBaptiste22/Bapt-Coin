import { Inject, Injectable } from '@nestjs/common';
import type { ICoinRepository } from './coin.repository.interface';
import  { COIN_REPOSITORY  } from './coin.repository.interface';
import { Coin } from './entities/coin.entity';
import { Nationality } from '../nationality/entities/nationality.entity';

@Injectable()
export class CoinService {
  constructor(
    @Inject(COIN_REPOSITORY) private readonly CoinRepo : ICoinRepository

  ){}

  async createCoin(name: string,description: string, value:string, quantity:string, nationality: Nationality, release: Date): Promise<Coin> {
    return await this.CoinRepo.addCoin(name, description, value, quantity, nationality, release);
  }
  
}

import { Module } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';
import { Coin } from './entities/coin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { COIN_REPOSITORY } from './coin.repository.interface';
import { CoinRepository } from './coin.repository';


@Module({
  imports: [TypeOrmModule.forFeature([
    Coin
  ])],
  controllers: [CoinController],
  providers: [CoinService,
    {provide : COIN_REPOSITORY, useClass: CoinRepository}
  ],

  exports : []
})
export class CoinModule {}


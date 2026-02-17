import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';
import { Coin } from './entities/coin.entity';
import { COIN_REPOSITORY } from './coin.repository.interface';
import { CoinRepository } from './coin.repository';
import { authModule } from 'src/contexts/Auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Coin]),
        authModule,
    ],
    controllers: [CoinController],
    providers: [
        CoinService,
        { provide: COIN_REPOSITORY, useClass: CoinRepository },
    ],
    exports: [],
})
export class CoinModule {}
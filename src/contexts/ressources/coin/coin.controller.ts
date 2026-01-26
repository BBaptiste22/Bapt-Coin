import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RscCoin } from './types/coin.dto';
import { CoinLoggedPresenter } from './types/coin.presenter';
import { CoinService } from './coin.service';

@Controller('coin')
export class CoinController {
  constructor(
    private readonly CoinService: CoinService
  ) {}

  @Post('creation')
  @HttpCode(HttpStatus.CREATED)

  async creation(@Body() body: RscCoin) {
    return await this.CoinService.createCoin(body.name,body.description,body.value,body.quantity,  body.nationality,body.release);
  }


}





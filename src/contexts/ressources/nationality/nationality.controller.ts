import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RscNationality } from './types/nationality.dto';
import { NationalityLoggedPresenter } from './types/nationality.presenter';
import { NationalityService } from './nationality.service';

@Controller('nationality')
export class NationalityController {
  constructor(
    private readonly nationalityService: NationalityService,
  ) {}

  @Post('creation')
  @HttpCode(HttpStatus.CREATED)

  async creation(@Body() body: RscNationality) {

    return await this.nationalityService.createNationality(body.name,body.country_code,body.flag);

    //return plainToInstance(NationalityLoggedPresenter,nationality,{ excludeExtraneousValues: true });
  }

  
}

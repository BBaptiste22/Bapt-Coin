import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import { UserLoggedPresenter } from './types/auth.presenter';
import { LoginDTO } from './types/auth.dto';

@Controller('auth')
export class authController {
  constructor(
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: LoginDTO): UserLoggedPresenter{

    const infoAuth = {username : 'Batzoum', password : 'Passwordff122-'}

    return plainToInstance(UserLoggedPresenter, infoAuth, {excludeExtraneousValues: true})
  }

}

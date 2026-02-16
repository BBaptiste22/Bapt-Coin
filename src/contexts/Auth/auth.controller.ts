import { Body, Controller, Post, HttpCode, HttpStatus, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './types/auth.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor) 
export class authController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDTO) {
    await this.authService.register(registerDto);
    return { message: 'Utilisateur créé avec succès' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDTO) {
    const tokens = await this.authService.login(loginDto);

    return tokens;
  }
}
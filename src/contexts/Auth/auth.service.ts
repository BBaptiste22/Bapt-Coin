import { Inject, Injectable } from '@nestjs/common';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import type { IAuthRepository } from './auth.repository.interface';
import { PASSWORD_HASHER } from './ports/password-hasher';
import { PasswordHasherService } from './password-hasher.service';
import { LoginDTO } from './types/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepo : IAuthRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordService : PasswordHasherService

  ){}

  async register(user: LoginDTO){

    const passwordHash = this.passwordService.hash(user.password)

  }

  async login(dto: any){
    

    //const passwordCheck = this.passwordService.compare(user.password,)
  }

  
}

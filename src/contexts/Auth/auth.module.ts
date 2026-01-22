import { Module } from '@nestjs/common';
import { authController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserCredentialsEntity } from './entities/user-credentials.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import { AuthRepository } from './auth.repository';
import { PASSWORD_HASHER } from './ports/password-hasher';
import { PasswordHasherService } from './password-hasher.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    UserCredentialsEntity
  ])],
  controllers: [authController],
  providers: [AuthService,
    {provide : AUTH_REPOSITORY, useClass: AuthRepository},
    {provide : PASSWORD_HASHER, useClass: PasswordHasherService}

  ],

  exports : []
})
export class authModule {}

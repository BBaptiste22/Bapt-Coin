import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserCredentialsEntity } from './entities/user-credentials.entity';
import { AUTH_REPOSITORY } from './auth.repository.interface';
import { AuthRepository } from './auth.repository';
import { PASSWORD_HASHER } from './ports/password-hasher';
import { PasswordHasherService } from './password-hasher.service';
import { JWT_TOKEN_SERVICE } from './ports/jwt';
import { TokenJwtService } from './token-jwt.service';
import { SendUserRegisteredEventHandler } from './handlers/send-user-registered.handler';

@Module({
    imports: [TypeOrmModule.forFeature([UserCredentialsEntity])],
    controllers: [authController],
    providers: [
        AuthService,SendUserRegisteredEventHandler,
        { provide: AUTH_REPOSITORY, useClass: AuthRepository },
        { provide: PASSWORD_HASHER, useClass: PasswordHasherService },
        { provide: JWT_TOKEN_SERVICE, useClass: TokenJwtService },
    ],
    exports: [JWT_TOKEN_SERVICE],
})
export class authModule {}
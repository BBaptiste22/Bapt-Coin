import { Inject, Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './types/auth.dto';
import { AUTH_REPOSITORY, type IAuthRepository } from './auth.repository.interface';
import { PASSWORD_HASHER, type IPasswordHasherPort } from './ports/password-hasher';
import { JWT_TOKEN_SERVICE, type JWTTokenPort } from './ports/jwt';
import { EVENT_BUS, type EventBusPort } from 'src/core/events/event.bus';
import { userRegisteredEvent } from './events/user-registrered.event';

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTH_REPOSITORY) private readonly authRepo: IAuthRepository,
        @Inject(PASSWORD_HASHER) private readonly passwordService: IPasswordHasherPort,
        @Inject(JWT_TOKEN_SERVICE) private readonly tokenService: JWTTokenPort,
        @Inject(EVENT_BUS) private readonly eventBus: EventBusPort,
    ) {}

    async register(registerDto: RegisterDTO) {
        const emailExists = await this.authRepo.checkEmailExists(registerDto.email);
        if (emailExists) {
            throw new ConflictException('Cet email est déjà utilisé');
        }

        const passwordHash = await this.passwordService.hashPassword(registerDto.password);

        const credential = await this.authRepo.createCredential({
            email: registerDto.email,
            password: passwordHash,
        });

        await this.eventBus.publish(
            userRegisteredEvent.create({
                id: credential.id,
                email: credential.email,
            })
        );

        return {
            id: credential.id,
            email: credential.email,
        };
    }

    async login(loginDto: LoginDTO) {
        const credential = await this.authRepo.findCredentialByEmail(loginDto.email);

        if (!credential) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        const isPasswordValid = await this.passwordService.comparePassword(
            loginDto.password,
            credential.password as string,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }

        const payload = {
            sub: credential.id,
            email: credential.email,
        };

        const accessToken = await this.tokenService.generateToken(payload, '1h');

        return {
            access_token: accessToken,
            user: {
                id: credential.id,
                email: credential.email,
            },
        };
    }
}
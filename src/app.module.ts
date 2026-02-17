import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './contexts/Auth/auth.module';
import { CoinModule } from './contexts/ressources/coin/coin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { NationalityModule } from './contexts/ressources/nationality/nationality.module';
import { eventModule } from './core/events/event.module';
import { NotificationsModule } from './core/mailer/MailerModule';
import { CollectionModule } from './contexts/collection/collection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'mysql',
        password: 'mysql',
        database: 'backend_base',

        synchronize: config.get<boolean>('DB_SYNCHRONIZE') ?? true,
        logging: config.get<boolean>('DB_LOGGING') ?? false,

        autoLoadEntities: true,

        charset: 'utf8mb4',
        timezone: 'Z',

        migrations: [
          join(process.cwd(), 'dist/core/database/migrations/*.js'),
          join(process.cwd(), 'src/core/database/migrations/*.ts'),
        ],
      }),
    }),

    authModule,
    CoinModule,
    NationalityModule,
    eventModule,
    NotificationsModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
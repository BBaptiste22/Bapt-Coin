import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './contexts/Auth/auth.module';
import { CoinModule } from './contexts/ressources/coin/coin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'process';
import { NationalityModule } from './contexts/ressources/nationality/nationality.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      inject: [ConfigService],
      useFactory: (config:ConfigService) => ({
        
        type: 'mysql',
        //host: config.get<string>('DB_HOST'),
        host: 'localhost',
        //port: config.get<number>('DB_PORT'),
        port: 3306,
        //username: config.get<string>('DB_USERNAME'),
        username: 'mysql',
        //password: config.get<string>('DB_PASSWORD'),
        password : 'mysql',
        //database: config.get<string>('DB_DATABASE'),
        database: 'backend_base',

        synchronize: config.get<boolean>('DB_SYNCHRONIZE') ?? true,
        logging: config.get<boolean>('DB_LOGGING') ?? false,

        autoLoadEntities: true,

        charset: 'utf8mb4',
        timezone: 'Z',

    // ssl: toBool(dbSsl) ? { rejectUnauthorized: false } : undefined,

      migrations: [
      join(process.cwd(), 'dist/core/database/migrations/*.js'),
      join(process.cwd(), 'src/core/database/migrations/*.ts'),
    ],
    })


    }),

    authModule,CoinModule, NationalityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

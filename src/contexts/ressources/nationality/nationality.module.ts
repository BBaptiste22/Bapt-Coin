import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nationality } from './entities/nationality.entity';
import { NationalityController } from './nationality.controller';
import { NationalityService } from './nationality.service';
import { NATIONALITY_REPOSITORY } from './nationality.repository.interface';
import { NationalityRepository } from './nationality.repository';
import { authModule } from 'src/contexts/Auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Nationality]),
        authModule,
    ],
    controllers: [NationalityController],
    providers: [
        NationalityService,
        { provide: NATIONALITY_REPOSITORY, useClass: NationalityRepository },
    ],
    exports: [],
})
export class NationalityModule {}
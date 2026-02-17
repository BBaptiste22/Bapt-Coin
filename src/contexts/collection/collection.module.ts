import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { COLLECTION_REPOSITORY } from './collection.repository.interface';
import { CollectionRepository } from './collection.repository';
import { authModule } from 'src/contexts/Auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Collection]),
        authModule,
    ],
    controllers: [CollectionController],
    providers: [
        CollectionService,
        { provide: COLLECTION_REPOSITORY, useClass: CollectionRepository },
    ],
})
export class CollectionModule {}
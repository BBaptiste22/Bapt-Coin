import { Inject, Injectable } from '@nestjs/common';
import { NATIONALITY_REPOSITORY, type INationalityRepository, NationalityFilter } from './nationality.repository.interface';
import { Nationality } from './entities/nationality.entity';
import { NationalityAlreadyExistsError, NationalityNotFoundError } from './errors/Nationality.errors';

@Injectable()
export class NationalityService {
    constructor(
        @Inject(NATIONALITY_REPOSITORY)
        private readonly nationalityRepo: INationalityRepository,
    ) {}

    async createNationality(name: string, country_code: string, flag: string): Promise<Nationality> {
        const existing = await this.nationalityRepo.findNationalityByName(name);
        if (existing) throw new NationalityAlreadyExistsError(
            { name: [`Une nationalité avec le nom "${name}" existe déjà`] },
            { name }
        );
        return await this.nationalityRepo.addNationality(name, country_code, flag);
    }

    async getNationalityById(id: string): Promise<Nationality> {
        const nationality = await this.nationalityRepo.findById(id);
        if (!nationality) throw new NationalityNotFoundError(
            { id: [`Aucune nationalité avec l'id ${id}`] },
            { id }
        );
        return nationality;
    }

    async getAllNationalities(filter?: NationalityFilter): Promise<Nationality[]> {
        return await this.nationalityRepo.findAll(filter);
    }

    async updateNationality(id: string, data: Partial<Nationality>): Promise<Nationality> {
        const nationality = await this.nationalityRepo.findById(id);
        if (!nationality) throw new NationalityNotFoundError(
            { id: [`Aucune nationalité avec l'id ${id}`] },
            { id }
        );
        return await this.nationalityRepo.updateNationality(id, data);
    }

    async deleteNationality(id: string): Promise<void> {
        const nationality = await this.nationalityRepo.findById(id);
        if (!nationality) throw new NationalityNotFoundError(
            { id: [`Aucune nationalité avec l'id ${id}`] },
            { id }
        );
        return await this.nationalityRepo.deleteNationality(id);
    }
}
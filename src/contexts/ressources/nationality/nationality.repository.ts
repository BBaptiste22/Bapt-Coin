import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { INationalityRepository, NationalityFilter } from "./nationality.repository.interface";
import { Nationality } from "./entities/nationality.entity";

@Injectable()
export class NationalityRepository implements INationalityRepository {
    constructor(
        @InjectRepository(Nationality)
        private readonly nationalityRepo: Repository<Nationality>
    ) {}

    async findNationalityByName(name: string): Promise<Nationality | null> {
        return this.nationalityRepo.findOne({ where: { name } });
    }

    async findById(id: string): Promise<Nationality | null> {
        return this.nationalityRepo.findOne({ where: { id } });
    }

    async findAll(filter?: NationalityFilter): Promise<Nationality[]> {
        const query = this.nationalityRepo.createQueryBuilder('nationality');

        if (filter?.name) {
            query.andWhere('nationality.name LIKE :name', { name: `%${filter.name}%` });
        }

        if (filter?.country_code) {
            query.andWhere('nationality.country_code LIKE :country_code', { country_code: `%${filter.country_code}%` });
        }

        return query.getMany();
    }

    async addNationality(name: string, country_code: string, flag: string): Promise<Nationality> {
        const nationality = this.nationalityRepo.create({ name, country_code, flag });
        return this.nationalityRepo.save(nationality);
    }

    async updateNationality(id: string, data: Partial<Nationality>): Promise<Nationality> {
        const nationality = await this.findById(id);
        if (!nationality) throw new NotFoundException();
        Object.assign(nationality, data);
        return this.nationalityRepo.save(nationality);
    }

    async deleteNationality(id: string): Promise<void> {
        const nationality = await this.findById(id);
        if (!nationality) throw new NotFoundException();
        await this.nationalityRepo.remove(nationality);
    }
}
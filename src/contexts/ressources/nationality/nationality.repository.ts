import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { INationalityRepository } from "./nationality.repository.interface";
import { Nationality } from "./entities/nationality.entity";

@Injectable()
export class NationalityRepository implements INationalityRepository{
    constructor(
        @InjectRepository(Nationality) private readonly NationalityRepository: Repository<Nationality>
    ){}
    async findNationalityByName(name: string) : Promise <Nationality | null>{
        const entity = await this.NationalityRepository.findOne({
            where: { name }
        })

        return entity
    }

    async addNationality(name: string,country_code: string, flag: string,): Promise<Nationality> {
        const nationality = this.NationalityRepository.create({name, country_code, flag});
        return await this.NationalityRepository.save(nationality);
    }

    async findAll(): Promise<Nationality[]> {
        return this.NationalityRepository.find();
    }


}
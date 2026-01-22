import { Inject, Injectable } from '@nestjs/common';
import { NATIONALITY_REPOSITORY, type INationalityRepository } from './nationality.repository.interface';
import { Nationality } from './entities/nationality.entity';

@Injectable()
export class NationalityService {
  constructor(
    @Inject(NATIONALITY_REPOSITORY) private readonly NationalityRepo : INationalityRepository

  ){}
 
  async createNationality(name: string,country_code: string, flag: string): Promise<Nationality> {
    return await this.NationalityRepo.addNationality(name, country_code, flag);
  }
  
}

import { Nationality } from "./entities/nationality.entity";

export const NATIONALITY_REPOSITORY = Symbol('NATIONALITY_REPOSITORY');

export interface NationalityFilter {
    name?: string;
    country_code?: string;
}

export interface INationalityRepository {
    
    findNationalityByName(name: string): Promise<Nationality | null>;
    findById(id: string): Promise<Nationality | null>;
    findAll(filter?: NationalityFilter): Promise<Nationality[]>;

    
    addNationality(name: string, country_code: string, flag: string): Promise<Nationality>;

    
    updateNationality(id: string, data: Partial<Nationality>): Promise<Nationality>;

    
    deleteNationality(id: string): Promise<void>;
}
import { Nationality } from "./entities/nationality.entity"

export const NATIONALITY_REPOSITORY = Symbol('NATIONALITY_REPOSITORY')

export interface INationalityRepository{
    findNationalityByName(name: String) : Promise <Nationality | null>


    addNationality(name: string,country_code: string,flag: string): Promise<Nationality>;
}
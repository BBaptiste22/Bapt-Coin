import { IsDate, IsNumber, IsString } from "class-validator";

export class RscNationality {

   
    
    @IsString()
    name : string

    @IsString()
    country_code : string

    @IsString()
    flag : string

}
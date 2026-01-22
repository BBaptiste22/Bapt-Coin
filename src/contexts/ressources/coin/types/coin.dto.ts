import { IsDate, IsNumber, IsString } from "class-validator";
import { RscNationality } from "../../nationality/types/nationality.dto";

export class RscCoin {

    
    
    @IsString()
    name : string

    @IsString()
    description : string

    @IsNumber()
    quantity : string

    @IsString()
    value : string 

    @IsDate()
    release : Date


    @IsNumber()
    nationality : number
}
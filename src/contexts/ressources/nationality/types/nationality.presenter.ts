import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class NationalityLoggedPresenter{
    @Expose()
    @IsString()
    name : String 
}
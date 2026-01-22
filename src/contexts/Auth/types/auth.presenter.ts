import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class UserLoggedPresenter{
    @Expose()
    @IsString()
    username : String 
}
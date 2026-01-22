import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class CoinLoggedPresenter{
    @Expose()
    @IsString()
    name : String 
}
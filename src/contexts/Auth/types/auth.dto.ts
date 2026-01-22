import { Expose } from "class-transformer"
import { IsEmail, isNumber, IsString, IsStrongPassword } from "class-validator"

export class LoginDTO  {
    @IsString()
    username !: string 

    @IsStrongPassword()
    password !: string


}
import { IsEmail, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {

  @ApiProperty({
    example: "john.doe@email.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "StrongP@ssw0rd!",
  })
  @IsStrongPassword(
    {},
    {
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
    }
  )
  password: string;
}

export class RegisterDTO {

  @ApiProperty({
    example: "john.doe@email.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "StrongP@ssw0rd!",
  })
  @IsStrongPassword(
    {},
    {
      message:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
    }
  )
  password: string;
}
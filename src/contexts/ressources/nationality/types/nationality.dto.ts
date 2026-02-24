import { IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RscNationality {

  @ApiProperty({
    example: "France",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "FR",
  })
  @IsString()
  country_code: string;

  @ApiProperty({
    example: "🇫🇷",
  })
  @IsString()
  flag: string;
}

export class UpdateNationalityDto {

  @ApiPropertyOptional({ example: "Allemagne" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "DE" })
  @IsOptional()
  @IsString()
  country_code?: string;

  @ApiPropertyOptional({ example: "🇩🇪" })
  @IsOptional()
  @IsString()
  flag?: string;
}

export class NationalityFilterDto {

  @ApiPropertyOptional({ example: "France" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "FR" })
  @IsOptional()
  @IsString()
  country_code?: string;
}
import {
  IsDateString,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RscCoin {

  @ApiProperty({
    example: "2 euros JO 2024",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "Pièce de 2 euros pour l'ouverture des Jeux Olympiques 2024 à Paris",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "22000000",
  })
  @IsString()
  quantity: string;

  @ApiProperty({
    example: "5",
  })
  @IsString()
  value: string;

  @ApiProperty({
    example: "2024-01-01",
  })
  @IsDateString()
  release: Date;

  @ApiProperty({
    example: "France",
  })
  @IsString()
  nationality: string;
}

export class UpdateCoinDto {

  @ApiPropertyOptional({ example: "2 euros Allemagne 2015" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "Pièce commémorative allemande 2€" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: "30000000" })
  @IsOptional()
  @IsString()
  quantity?: string;

  @ApiPropertyOptional({ example: "3" })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiPropertyOptional({ example: "Allemagne" })
  @IsOptional()
  @IsString()
  nationality?: string;
}

export class CoinFilterDto {

  @ApiPropertyOptional({
    example: "2 euros JO 2024",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: "France",
  })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiPropertyOptional({
    example: "1",
  })
  @IsOptional()
  @IsString()
  page?: string = "1";

  @ApiPropertyOptional({
    example: "10"
  })
  @IsOptional()
  @IsString()
  limit?: string = "10";
}
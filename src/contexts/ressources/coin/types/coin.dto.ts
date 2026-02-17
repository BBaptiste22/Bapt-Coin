import { IsDateString, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class RscCoin {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    quantity: string;

    @IsString()
    value: string;

    @IsDateString()
    release: Date;

    @IsString()
    nationality: string;
}

export class UpdateCoinDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    quantity?: string;

    @IsOptional()
    @IsString()
    value?: string;

    @IsOptional()
    @IsString()
    nationality?: string;
}

export class CoinFilterDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    nationality?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 10;
}
import { IsOptional, IsString } from "class-validator";

export class RscNationality {
    @IsString()
    name: string;

    @IsString()
    country_code: string;

    @IsString()
    flag: string;
}

export class UpdateNationalityDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    country_code?: string;

    @IsOptional()
    @IsString()
    flag?: string;
}

export class NationalityFilterDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    country_code?: string;
}
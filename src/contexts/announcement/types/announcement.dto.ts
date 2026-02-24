import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAnnouncementDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    price?: string;

    @IsArray()
    @IsUUID('4', { each: true })
    offeredCoins: string[]; // IDs des coins proposées

    @IsArray()
    @IsUUID('4', { each: true })
    wantedCoins: string[]; // IDs des coins recherchées
}
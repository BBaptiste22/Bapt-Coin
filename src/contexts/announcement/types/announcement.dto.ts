import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAnnouncementDto {

    @ApiProperty({
    example: 'Échange pièce 2€ JO 2024',
    })
    @IsString()
    title: string;

    @ApiProperty({
    example: 'Je propose ma pièce JO 2024 et cherche une allemande.'
    })
    @IsString()
    description: string;

    @ApiPropertyOptional({
    example: '5.00',
    })
    @IsOptional()
    @IsString()
    price?: string;

    @ApiProperty({
    example: ['bf8c3997-3768-4975-bc13-fd7a54a02e12'],
    description: 'Liste des IDs des pièces proposées',
    type: [String],
    })
    @IsArray()
    @IsUUID('4', { each: true })
    offeredCoins: string[]; // IDs des coins proposées



    @ApiProperty({
    example: ['eb2c2233-1fbb-4919-878b-b5e35761c14d'],
    description: 'Liste des IDs des pièces recherchées',
    type: [String],
    })
    @IsArray()
    @IsUUID('4', { each: true })
    wantedCoins: string[]; // IDs des coins recherchées
}
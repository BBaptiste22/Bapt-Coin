import { IsString, IsUUID } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    name: string;
}

export class AddCoinDto {
    @IsUUID()
    coinId: string;
}
import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCollectionDto {

  @ApiProperty({
    example: "Ma collection de coins",
  })
  @IsString()
  name: string;
}

export class AddCoinDto {

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsUUID()
  coinId: string;
}
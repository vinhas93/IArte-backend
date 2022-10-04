import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CanvaEntity } from '../entity/canva.entity';

export class UpdateCanvaDto extends PartialType(CanvaEntity) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Canva's name",
    example: 'photorealistic',
  })
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: "Canva's price",
    example: 12.5,
  })
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Canva's genre",
    example: 'realistic',
  })
  genre?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "Canva's description",
    example: 'This is the realistic photo',
  })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Validates if canva is available in stock',
    example: true,
  })
  inStock?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Canva image',
    example:
      'https://cdn.discordapp.com/attachments/1008571078211280957/1025200807219572827/Art_red_96_Tea_coffee_lemonades_beverages_glass_smoke_autumn_bl_1936b5f8-ea71-4233-ba0c-26503652ef47.png',
  })
  image?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Name of the category the canva belongs to',
    example: 'tshirt',
  })
  categoryName?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'history mass update canva',
    example: 1,
  })
  updateCanva?: any;
}

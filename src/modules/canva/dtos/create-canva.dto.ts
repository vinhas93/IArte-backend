import { ApiProperty } from '@nestjs/swagger';
import { CanvaGenre } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCanvaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Canva's name",
    example: 'photorealistic',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "Canva's price",
    example: 12.5,
  })
  price: number;

  @IsEnum(['Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', 'Others'])
  @IsIn(['Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', 'Others'])
  @ApiProperty({
    description: "Canva's genre",
    example: 'Realistic',
  })
  genre: CanvaGenre;

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Canva image',
    example:
      'https://cdn.discordapp.com/attachments/1008571078211280957/1025200807219572827/Art_red_96_Tea_coffee_lemonades_beverages_glass_smoke_autumn_bl_1936b5f8-ea71-4233-ba0c-26503652ef47.png',
  })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the category the canva belongs to',
    example: 'tshirt',
  })
  categoryName: string;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Base Price of the category',
    example: 20.99,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the category',
    example: 'wallpaper',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the category',
    example: 'A downloadable file to use as a PC wallpaper',
  })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Profit relational cost',
    example: 0.0,
  })
  cost: number;
}

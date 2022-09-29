import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryEntity } from '../entity/category.entity';

export class UpdateCategoryDto extends PartialType(CategoryEntity) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Base Price of the category',
    example: 20.99,
  })
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name of the category',
    example: 'wallpaper',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Description of the category',
    example: 'A downloadable file to use as a PC wallpaper',
  })
  description?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'Profit relational cost',
    example: 0.0,
  })
  cost?: number;
}

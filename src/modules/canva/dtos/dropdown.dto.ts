import { ApiProperty } from '@nestjs/swagger';
import { CanvaGenre } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';

export class DropdownDto {
  @IsOptional()
  @IsIn(['Others', 'Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', ''])
  @ApiProperty({
    description: "Filter Canva's results by genre",
    // example: 'Fantasy',
    required: false,
    // enum: ['Others', 'Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', ''],
  })
  genre?: CanvaGenre;

  @IsOptional()
  @ApiProperty({
    description: "Filter Canva's results by category",
    required: false,
  })
  categoryName?: string;
}

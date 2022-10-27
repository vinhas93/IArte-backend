import { ApiProperty } from '@nestjs/swagger';
import { CanvaGenre } from '@prisma/client';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class DropdownDto {
  @IsOptional()
  @IsIn(['Others', 'Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', ''])
  @ApiProperty({
    description: "Filter Canva's results by genre",
    example: 'Fantasy',
  })
  genre?: CanvaGenre;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Filter Canva's results by category",
    example: 'wolf',
  })
  categoryName?: string;
}

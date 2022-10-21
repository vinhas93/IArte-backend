import { ApiProperty } from '@nestjs/swagger';
import { CanvaGenre } from '@prisma/client';
import { IsEnum, IsIn, IsString } from 'class-validator';

export class DropdownDto {
  @IsEnum(['Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', 'Others'])
  @IsIn(['Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', 'Others'])
  @ApiProperty({
    description: "Canva's genre",
    example: 'Others',
  })
  genre?: CanvaGenre;

  @IsString()
  @ApiProperty({
    description: 'Name of the category the canva belongs to',
    example: 'tshirt',
  })
  categoryName?: string;
}

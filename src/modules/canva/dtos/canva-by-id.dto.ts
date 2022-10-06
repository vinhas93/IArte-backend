import { ApiProperty } from '@nestjs/swagger';
import { CanvaGenre } from '@prisma/client';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CanvaByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Canva's id",
    example: '1',
  })
  id: string;
}

export class FilterBySearchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Canva's name",
    example: 'John Smith',
  })
  name: string;
}

export class FilterByGenreDto {
  @IsEnum(['Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', 'Others'])
  @IsIn(['Realism', 'Abstract', 'Fantasy', 'Gothic', 'PopArt', 'Others'])
  @ApiProperty({
    description: "Canva's genre",
    example: 'Realistic',
  })
  genre: CanvaGenre;
}

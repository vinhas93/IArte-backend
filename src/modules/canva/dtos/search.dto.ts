import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @ApiProperty({
    description: 'Search params',
    example: 'Karleigh Wright',
    required: false,
  })
  search?: string;
}

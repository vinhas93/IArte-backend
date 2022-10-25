import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Search params',
    example: 'Karleigh Wright',
  })
  search?: string;
}

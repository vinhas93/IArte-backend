import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Search params',
    example: 'Karleigh Wright',
  })
  search?: string;
}

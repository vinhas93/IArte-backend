import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsNumberString()
  @ApiProperty({
    description: "Canva's id",
    example: '1',
    required: false,
  })
  id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Canva's name",
    example: 'John Smith',
    required: false,
  })
  name?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Canva's id",
    example: '1',
  })
  id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Canva's name",
    example: 'John Smith',
  })
  name?: string;
}

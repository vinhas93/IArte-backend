import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CategoryByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Category's Id",
    example: 1,
  })
  id: string;
}

export class CategoryByNameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Category's name",
    example: 'walpaper',
  })
  name: string;
}

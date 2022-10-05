import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CategoryByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Category's Id",
    example: 1,
  })
  id: string;
}

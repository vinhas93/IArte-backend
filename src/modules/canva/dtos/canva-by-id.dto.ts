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

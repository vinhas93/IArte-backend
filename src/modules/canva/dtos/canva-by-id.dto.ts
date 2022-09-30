import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

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

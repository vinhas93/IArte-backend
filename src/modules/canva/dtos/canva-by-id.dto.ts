import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CanvaByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Canva's id",
    example: '1',
  })
  id: string;
}

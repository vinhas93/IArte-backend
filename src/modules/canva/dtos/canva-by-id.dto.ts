import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CanvaByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

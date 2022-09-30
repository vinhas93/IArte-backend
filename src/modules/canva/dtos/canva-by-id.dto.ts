import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CanvaByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

export class FilterBySearchDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

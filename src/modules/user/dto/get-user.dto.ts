import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetUserByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}

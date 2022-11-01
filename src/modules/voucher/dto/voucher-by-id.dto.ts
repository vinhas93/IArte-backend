import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class VoucherByIdDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Voucher's Id",
    example: 1,
  })
  id: string;
}

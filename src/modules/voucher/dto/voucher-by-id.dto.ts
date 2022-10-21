import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VoucherByIdDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "Voucher's Id",
    example: 1,
  })
  id: number;
}

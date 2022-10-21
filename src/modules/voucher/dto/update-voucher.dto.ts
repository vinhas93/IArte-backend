import { PartialType } from '@nestjs/swagger';
import { VoucherEntity } from '../entity/voucher.entity';

export class UpdateVoucherDto extends PartialType(VoucherEntity) {}

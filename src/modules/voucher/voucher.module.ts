import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { VoucherRepository } from './repository/voucher.repository';
import {
  CreateVoucherService,
  DeleteVoucherService,
  FindAllVouchersService,
  FindVoucherByIdService,
  UpdateVoucherService,
} from './services';
import { VoucherController } from './voucher.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [VoucherController],
  providers: [
    VoucherRepository,
    CreateVoucherService,
    FindAllVouchersService,
    FindVoucherByIdService,
    UpdateVoucherService,
    DeleteVoucherService,
  ],
})
export class VoucherModule {}

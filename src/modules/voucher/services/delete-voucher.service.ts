import { Injectable } from '@nestjs/common';
import { VoucherRepository } from '../repository/voucher.repository';

@Injectable()
export class DeleteVoucherService {
  constructor(private voucherRepository: VoucherRepository) {}

  async execute(id: number) {
    if (isNaN(id)) {
      return {
        status: 400,
        data: { message: 'ID MUST be a number' },
      };
    }

    const voucherExists = await this.voucherRepository.findVoucherById(id);

    if (!voucherExists) {
      return {
        status: 404,
        data: { message: 'Voucher not Found!' },
      };
    }

    await this.voucherRepository.deleteVoucher(id);

    return {
      status: 200,
      data: { message: 'Voucher deleted successfully!' },
    };
  }
}

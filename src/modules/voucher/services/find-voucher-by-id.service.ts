import { Injectable } from '@nestjs/common';
import { VoucherRepository } from '../repository/voucher.repository';

@Injectable()
export class FindVoucherByIdService {
  constructor(private voucherRepository: VoucherRepository) {}

  async execute(id: number) {
    const voucherExists = await this.voucherRepository.findVoucherById(+id);

    if (!voucherExists) {
      return {
        status: 400,
        data: { message: 'Voucher not found!' },
      };
    }

    return {
      status: 200,
      data: voucherExists,
    };
  }
}

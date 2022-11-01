import { Injectable } from '@nestjs/common';
import { UpdateVoucherDto } from '../dto/update-voucher.dto';
import { VoucherRepository } from '../repository/voucher.repository';

@Injectable()
export class UpdateVoucherService {
  constructor(private voucherRepository: VoucherRepository) {}

  async execute(id: number, data: UpdateVoucherDto) {
    if (isNaN(id)) {
      return {
        status: 400,
        data: { message: 'ID MUST be a number' },
      };
    }

    const voucherExists = await this.voucherRepository.findVoucherById(id);

    if (!voucherExists) {
      return {
        status: 400,
        data: { message: 'Voucher not Found!' },
      };
    }

    const updateVoucher = await this.voucherRepository.updateVoucher(id, data);

    if (!updateVoucher) {
      return {
        status: 500,
        data: { message: "It's not possible to update voucher!" },
      };
    }

    return {
      status: 200,
      data: updateVoucher,
    };
  }
}

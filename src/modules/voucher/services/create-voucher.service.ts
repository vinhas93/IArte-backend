import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from '../dto/create-voucher.dto';
import { VoucherRepository } from '../repository/voucher.repository';

@Injectable()
export class CreateVoucherService {
  constructor(private voucherRepository: VoucherRepository) {}

  async execute(data: CreateVoucherDto) {
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
    const createVoucher = await this.voucherRepository.createVoucher(data);
    return {
      status: 201,
      data: createVoucher,
    };
  }
}

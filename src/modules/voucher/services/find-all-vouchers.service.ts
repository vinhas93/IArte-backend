import { PageMetaDto } from './../../../shared/pagination-dtos/pageMeta.dto';
import { Injectable } from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/shared/pagination-dtos';
import { VoucherRepository } from '../repository/voucher.repository';

@Injectable()
export class FindAllVouchersService {
  constructor(private voucherRepository: VoucherRepository) {}

  async execute(pageOptionsDto: PageOptionsDto) {
    const vouchers = await this.voucherRepository.findAllVouchersByParams(
      pageOptionsDto,
    );

    const allVouchers = await this.voucherRepository.countAllVouchers();

    const itemCount = allVouchers.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(vouchers, pageMetaDto);

    return {
      status: 200,
      data: response,
    };
  }
}

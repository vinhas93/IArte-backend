import { PrismaClient } from '@prisma/client';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateVoucherDto } from '../dto/create-voucher.dto';
import { UpdateVoucherDto } from '../dto/update-voucher.dto';
import { VoucherEntity } from '../entity/voucher.entity';

export class VoucherRepository extends PrismaClient {
  async createVoucher(data: CreateVoucherDto) {
    return this.voucher.create({ data }).catch(handleError);
  }

  async findVoucherById(id: number): Promise<VoucherEntity> {
    return this.voucher.findUnique({ where: { id } }).catch(handleError);
  }

  async findAllVouchersByParams({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<VoucherEntity[]> {
    return this.voucher
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async countAllVouchers() {
    return this.voucher
      .findMany({
        select: {
          id: true,
        },
      })
      .catch(handleError);
  }

  async findAllVouchers() {
    return this.voucher.findMany({}).catch(handleError);
  }

  async updateVoucher(
    id: number,
    data: UpdateVoucherDto,
  ): Promise<VoucherEntity> {
    return this.voucher.update({ where: { id }, data }).catch(handleError);
  }

  async deleteVoucher(id: number) {
    return this.voucher.delete({ where: { id } }).catch(handleError);
  }
}

import { Prisma } from '@prisma/client';

export class VoucherEntity implements Prisma.VoucherUncheckedCreateInput {
  id?: number;
  discountRate: number;
  active?: boolean;
  startDate?: string | Date;
  maxQuantity?: number;
  interval: number;
  endDate?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  cart?: Prisma.CartUncheckedCreateNestedManyWithoutVoucherInput;
}

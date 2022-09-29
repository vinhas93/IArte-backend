import { Prisma } from '@prisma/client';

export class CategoryEntity implements Prisma.CategoryUncheckedCreateInput {
  id?: number;
  price: number;
  name: string;
  description?: string;
  cost: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  canvas?: Prisma.CanvaUncheckedCreateNestedManyWithoutCategoryInput;
}

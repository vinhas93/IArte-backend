import { Prisma } from '@prisma/client';

export class CanvaEntity implements Prisma.CanvaUncheckedCreateInput {
  id?: number;
  name: string;
  price: number;
  genre?: string;
  description?: string;
  inStock?: boolean;
  image: string;
  categoryName: string;
  product?: Prisma.ProductUncheckedCreateNestedManyWithoutCanvaInput;
  updateCanva?: Prisma.UpdateCanvaUncheckedCreateNestedManyWithoutCanvaInput;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}


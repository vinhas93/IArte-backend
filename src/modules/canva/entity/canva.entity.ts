import { Prisma } from '@prisma/client';

export class CanvaEntity {
  id?: number;
  name: string;
  price: number;
  genre?: string;
  description?: string;
  inStock?: boolean;
  image: string;
  categoryName: string;
  product?: Prisma.ProductUncheckedCreateNestedManyWithoutCanvaInput;
  updateCanva?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

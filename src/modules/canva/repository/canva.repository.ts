import { PrismaClient } from '@prisma/client';
import { CreateCanvaDto } from '../dtos/create-canva.dto';
import { UpdateCanvaDto } from '../dtos/update-canva.dto';
import { CanvaEntity } from '../entity/canva.entity';

export class CanvaRepository extends PrismaClient {
  async createCanva(data: CreateCanvaDto): Promise<CanvaEntity> {
    return this.canva.create({ data });
  }

  async getAllCanvas(): Promise<CanvaEntity[]> {
    return this.canva.findMany();
  }

  async getCanvaById(id: number): Promise<CanvaEntity> {
    return this.canva.findFirst({ where: { id } });
  }

  async search(search: string): Promise<CanvaEntity[]> {
    return this.canva.findMany({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  }

  async updateCanvaById(
    id: number,
    data: UpdateCanvaDto,
  ): Promise<CanvaEntity> {
    return this.canva.update({ where: { id }, data });
  }

  async deleteCava(id: number) {
    return this.canva.delete({ where: { id } });
  }
}

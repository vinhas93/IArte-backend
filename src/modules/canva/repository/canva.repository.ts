import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateCanvaDto } from '../dtos/create-canva.dto';
import { UpdateCanvaDto } from '../dtos/update-canva.dto';
import { CanvaEntity } from '../entity/canva.entity';

export class CanvaRepository extends PrismaClient {
  async createCanva(data: CreateCanvaDto): Promise<CanvaEntity> {
    return this.canva.create({ data }).catch(handleError);
  }

  async getAllCanvas(): Promise<CanvaEntity[]> {
    return this.canva.findMany().catch(handleError);
  }

  async getCanvaById(id: number): Promise<CanvaEntity> {
    return this.canva.findFirst({ where: { id } }).catch(handleError);
  }

  async getCanvaByParams(params: object): Promise<CanvaEntity> {
    return this.canva.findFirst(params).catch(handleError);
  }

  async search(search: string): Promise<CanvaEntity[]> {
    return this.canva
      .findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      })
      .catch(handleError);
  }

  async updateCanvaById(
    id: number,
    data: UpdateCanvaDto,
  ): Promise<CanvaEntity> {
    return this.canva.update({ where: { id }, data }).catch(handleError);
  }

  async deleteCava(id: number) {
    return this.canva.delete({ where: { id } }).catch(handleError);
  }
}

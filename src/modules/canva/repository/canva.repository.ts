import { CanvaGenre, PrismaClient } from '@prisma/client';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateCanvaDto } from '../dtos/create-canva.dto';
import { UpdateCanvaDto } from '../dtos/update-canva.dto';
import { CanvaEntity } from '../entity/canva.entity';

export class CanvaRepository extends PrismaClient {
  async createCanva(data: CreateCanvaDto): Promise<CanvaEntity> {
    return this.canva.create({ data }).catch(handleError);
  }

  async findAllCanvasByParams({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<CanvaEntity[]> {
    return this.canva
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async getAllCanvas(name = '') {
    if (name == '') {
      return this.canva
        .findMany({
          select: {
            id: true,
          },
        })
        .catch(handleError);
    }
    return this.canva
      .findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
        },
      })
      .catch(handleError);
  }

  async filterCanvasByGenre(genre: CanvaGenre): Promise<any> {
    return this.canva
      .findMany({
        where: {
          genre,
        },
      })
      .catch(handleError);
  }

  async getCanvaById(id: number): Promise<CanvaEntity> {
    return this.canva.findFirst({ where: { id } }).catch(handleError);
  }

  async getCanvaByParams(params: object): Promise<CanvaEntity> {
    return this.canva.findFirst(params).catch(handleError);
  }

  async findAllSearchByParam({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<CanvaEntity[]> {
    return this.canva
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async search(
    search: string,
    { skip, order, take, orderByColumn }: PageOptionsDto,
  ): Promise<CanvaEntity[]> {
    return this.canva
      .findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
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

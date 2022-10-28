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

  async getAllCanvasPaginated(
    name: string,
    { skip, order, take, orderByColumn }: PageOptionsDto,
  ): Promise<CanvaEntity[]> {
    if (name == '') {
      return this.canva.findMany().catch(handleError);
    }
    return this.canva
      .findMany({
        where: {
          name: {
            contains: name,
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

  async filterCanvasByGenrePaginated(
    name: string,
    genre: CanvaGenre,
    { skip, order, take, orderByColumn }: PageOptionsDto,
  ) {
    if (name == '') {
      return this.canva
        .findMany({
          where: {
            genre,
          },
          skip,
          take,
          orderBy: {
            [orderByColumn]: order,
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
          genre,
        },
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async filterCanvasByGenreComplete(name: string, genre: CanvaGenre) {
    if (name == '') {
      return this.canva
        .findMany({
          where: {
            genre,
          },
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
          genre,
        },
        select: {
          id: true,
        },
      })
      .catch(handleError);
  }

  async filterCanvasByCategoryPaginated(
    name: string,
    categoryName: string,
    { skip, order, take, orderByColumn }: PageOptionsDto,
  ) {
    if (name == '') {
      return this.canva
        .findMany({
          where: {
            categoryName,
          },
          skip,
          take,
          orderBy: {
            [orderByColumn]: order,
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
          categoryName,
        },
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async filterCanvasByCategoryComplete(name: string, categoryName: string) {
    if (name == '') {
      return this.canva
        .findMany({
          where: {
            categoryName,
          },
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
          categoryName,
        },
        select: {
          id: true,
        },
      })
      .catch(handleError);
  }

  async filterCanvasDropdownPaginated(
    name: string,
    genre: CanvaGenre,
    categoryName: string,
    { skip, order, take, orderByColumn }: PageOptionsDto,
  ) {
    if (name == '') {
      return this.canva
        .findMany({
          where: {
            categoryName,
            genre,
          },
          skip,
          take,
          orderBy: {
            [orderByColumn]: order,
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
          categoryName,
          genre,
        },
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async filterCanvasDropdownComplete(
    name: string,
    genre: CanvaGenre,
    categoryName: string,
  ) {
    if (name == '') {
      return this.canva
        .findMany({
          where: {
            categoryName,
            genre,
          },
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
          categoryName,
          genre,
        },
        select: {
          id: true,
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

  async updateCanvaById(
    id: number,
    data: UpdateCanvaDto,
  ): Promise<CanvaEntity> {
    return this.canva.update({ where: { id }, data }).catch(handleError);
  }

  async deleteCanva(id: number) {
    return this.canva.delete({ where: { id } }).catch(handleError);
  }
}

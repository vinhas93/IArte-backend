import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entity/category.entity';
import { PageOptionsDto } from '../../../shared/pagination-dtos/index';
import { handleError } from 'src/shared/utils/handle-error.util';

export class CategoryRepository extends PrismaClient {
  async createCategory(data: CreateCategoryDto) {
    return this.category.create({ data }).catch(handleError);
  }

  async findCategoryByName(name: string): Promise<any> {
    return this.category
      .findUnique({
        where: {
          name,
        },
        include: { canvas: true },
      })
      .catch(handleError);
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    return this.category.findFirst({ where: { id } }).catch(handleError);
  }

  async findAllCategoriesByParams({
    skip,
    order,
    orderByColumn,
    take,
  }: PageOptionsDto): Promise<CategoryEntity[]> {
    return this.category
      .findMany({
        skip,
        take,
        orderBy: {
          [orderByColumn]: order,
        },
      })
      .catch(handleError);
  }

  async countAllCategories() {
    return this.category
      .findMany({
        select: {
          id: true,
        },
      })
      .catch(handleError);
  }

  async findAllCategories() {
    return this.category.findMany({}).catch(handleError);
  }

  async updateCategory(
    id: number,
    data: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.category
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async deleteCategory(id: number) {
    return this.category.delete({ where: { id } }).catch(handleError);
  }
}

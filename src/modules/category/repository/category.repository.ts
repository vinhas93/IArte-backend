import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryEntity } from '../entity/category.entity';

export class CategoryRepository extends PrismaClient {
  async createCategory(data: CreateCategoryDto) {
    return this.category.create({ data });
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const singleCategory = this.category
      .findUnique({ where: { name } })
      .catch(handleError);
    if (!singleCategory) {
      throw new NotFoundException('Category not found!');
    }
    return singleCategory;
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    const categories = await this.category.findMany().catch(handleError);

    if (categories.length === 0) {
      new NotFoundException('No categories found!');
    }
    return categories;
  }
}

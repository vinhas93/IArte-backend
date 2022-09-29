import { PrismaClient } from '@prisma/client';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entity/category.entity';

export class CategoryRepository extends PrismaClient {
  async createCategory(data: CreateCategoryDto) {
    return this.category.create({ data });
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    return this.category.findUnique({ where: { name } });
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    return this.category.findFirst({ where: { id } });
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    return this.category.findMany();
  }

  async updateCategory(
    id: number,
    data: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return this.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number) {
    return this.category.delete({ where: { id } });
  }
}

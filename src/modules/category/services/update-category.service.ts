import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class UpdateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: number, data: UpdateCategoryDto) {
    const categoryExists = await this.categoryRepository.findCategoryById(id);

    if (!categoryExists) {
      return {
        status: 400,
        data: { message: 'Category not Found!' },
      };
    }

    const updateCategory = await this.categoryRepository.updateCategory(
      id,
      data,
    );

    if (!updateCategory) {
      return {
        status: 500,
        data: { message: "It's not possible to update category!" },
      };
    }

    return {
      status: 200,
      data: updateCategory,
    };
  }
}

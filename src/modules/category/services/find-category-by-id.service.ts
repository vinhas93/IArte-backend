import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class FindCategoryByIdService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: number) {
    const categoryExists = await this.categoryRepository.findCategoryById(id);

    if (!categoryExists) {
      return {
        status: 400,
        data: { message: 'Category not found!' },
      };
    }

    return {
      status: 200,
      data: categoryExists,
    };
  }
}

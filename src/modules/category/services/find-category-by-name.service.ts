import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class FindCategoryByNameService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(name: string) {
    const categoryExists = await this.categoryRepository.findCategoryByName(
      name,
    );

    if (!categoryExists) {
      return {
        status: 404,
        data: { message: 'Category not Found!' },
      };
    }

    return {
      status: 200,
      data: categoryExists,
    };
  }
}

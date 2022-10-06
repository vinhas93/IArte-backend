import { Injectable } from '@nestjs/common';

import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class FindAllCategoriesDropdownService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute() {
    const data = await this.categoryRepository.findAllCategories();

    return {
      status: 200,
      data,
    };
  }
}

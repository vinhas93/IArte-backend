import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';

@Injectable()
export class FindCategoryByNameService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(name: string) {
    return this.categoryRepository.findCategoryByName(name);
  }
}

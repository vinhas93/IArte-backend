import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class FindAllCategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute() {
    return this.categoryRepository.findAllCategories();
  }
}

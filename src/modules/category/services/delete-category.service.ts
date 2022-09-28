import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class DeleteCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: number) {
    return this.categoryRepository.deleteCategory(+id);
  }
}

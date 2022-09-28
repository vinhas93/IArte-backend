import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class UpdateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: number, data: UpdateCategoryDto) {
    return this.categoryRepository.updateCategory(+id, data);
  }
}

import { CategoryRepository } from '../repository/category.repository';

export class FindAllCategoriesService {
  async execute() {
    const categoryRepository = new CategoryRepository();

    return await categoryRepository.findAllCategories();
  }
}

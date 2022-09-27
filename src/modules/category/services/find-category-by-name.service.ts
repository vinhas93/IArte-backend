import { CategoryRepository } from 'src/modules/category/repository/category.repository';

export class FindCategoryByNameService {
  async execute(name: string) {
    const categoryRepository = new CategoryRepository();

    return await categoryRepository.findCategoryByName(name);
  }
}

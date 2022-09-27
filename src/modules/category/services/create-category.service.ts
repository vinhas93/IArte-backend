import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CreateCategoryService {
  constructor(private categoryRep: CategoryRepository) {}

  async execute(data: CreateCategoryDto) {
    const { name } = data;

    const categoryAlreadyExists = await this.categoryRep.findCategoryByName(
      name,
    );

    if (categoryAlreadyExists) {
      return {
        status: 400,
        data: { message: 'Category already exists in records' },
      };
    } else {
      const createCategory = await this.categoryRep.createCategory(data);
      return {
        status: 201,
        data: createCategory,
      };
    }
  }
}

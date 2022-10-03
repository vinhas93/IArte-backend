import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';
import { CreateCanvaDto } from '../dtos/create-canva.dto';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class CreateCanvaService {
  constructor(
    private canvaRepository: CanvaRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(data: CreateCanvaDto) {
    const categoryExists = await this.categoryRepository.findCategoryByName(
      data.categoryName,
    );

    if (!categoryExists) {
      return {
        status: 400,
        data: { message: 'Invalid Category.' },
      };
    }

    const createCanva = await this.canvaRepository.createCanva(data);

    return {
      status: 201,
      data: createCanva,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';
import { UpdateCanvaDto } from '../dtos/update-canva.dto';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class UpdateCanvaHelper {
  constructor(
    private canvaRepository: CanvaRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(id: number, data: UpdateCanvaDto) {
    const { name, categoryName } = data;

    if (name || categoryName) {
      const params = {
        where: {
          name,
          categoryName,
        },
      };

      const canvaExists = await this.canvaRepository.getCanvaByParams(params);

      if (canvaExists && id != canvaExists.id) {
        return {
          status: 400,
          data: { message: 'This product already exists.' },
        };
      }
    }

    if (categoryName) {
      const category = await this.categoryRepository.findCategoryByName(
        data.categoryName,
      );

      if (!category) {
        return {
          status: 400,
          data: { message: 'Invalid Category.' },
        };
      }

      if (category.price > data.price) {
        return {
          status: 400,
          data: {
            message: `The minimum price for ${category.name}'s category is: $${category.price}.`,
          },
        };
      }
    }
    return {
      status: 200,
    };
  }
}

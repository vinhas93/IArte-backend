import { PageMetaDto } from './../../../shared/pagination-dtos/pageMeta.dto';
import { Injectable } from '@nestjs/common';
import { PageDto, PageOptionsDto } from 'src/shared/pagination-dtos';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class FindAllCategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(pageOptionsDto: PageOptionsDto) {
    const categories = await this.categoryRepository.findAllCategoriesByParams(
      pageOptionsDto,
    );

    const allCategories = await this.categoryRepository.countAllCategories();

    const itemCount = allCategories.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(categories, pageMetaDto);

    return {
      status: 200,
      data: response,
    };
  }
}

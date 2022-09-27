import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryService } from './services/create-category.service';
import { FindAllCategoriesService } from './services/find-all-categories.service';
import { FindCategoryByNameService } from './services/find-category-by-name.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private createCategoryService: CreateCategoryService,
    private findCategoryByNameService: FindCategoryByNameService,
    private findAllCategoriesService: FindAllCategoriesService,
  ) {}

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto, @Res() res: Response) {
    const { status, data } = await this.createCategoryService.execute(dto);
    return res.status(status).send(data);
  }

  @Get('/:name')
  findCategoryByName(@Param('name') name: string) {
    return this.findCategoryByNameService.execute(name);
  }

  @Get()
  findAllCategories() {
    return this.findAllCategoriesService.execute();
  }
}

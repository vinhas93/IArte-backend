import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Post,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCategoryService } from './services';
import { CreateCategoryService } from './services/create-category.service';
import { DeleteCategoryService } from './services/delete-category.service';
import { FindAllCategoriesService } from './services/find-all-categories.service';
import { FindCategoryByNameService } from './services/find-category-by-name.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private createCategoryService: CreateCategoryService,
    private findCategoryByNameService: FindCategoryByNameService,
    private findAllCategoriesService: FindAllCategoriesService,
    private updateCategoryService: UpdateCategoryService,
    private deleteCategoryService: DeleteCategoryService,
  ) {}

  //@UseGuards(AuthGuard())
  //@ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Create a new category - (FOR ADMIN).',
  })
  async createCategory(@Body() dto: CreateCategoryDto, @Res() res: Response) {
    const { status, data } = await this.createCategoryService.execute(dto);
    return res.status(status).send(data);
  }

  @Get('/:name')
  @ApiOperation({
    summary: 'Return a category by name.',
  })
  async findCategoryByName(@Param('name') name: string) {
    return this.findCategoryByNameService.execute(name);
  }

  @Get()
  @ApiOperation({
    summary: 'Return all categories registered.',
  })
  async findAllCategories() {
    return this.findAllCategoriesService.execute();
  }

  //@UseGuards(AuthGuard())
  //@ApiBearerAuth()
  @Patch()
  @ApiOperation({
    summary: 'Edit a category by ID - (FOR ADMIN).',
  })
  async updateCategory(@Param('id') id: number, data: UpdateCategoryDto) {
    return this.updateCategoryService.execute(+id, data);
  }

  //@UseGuards(AuthGuard())
  //@ApiBearerAuth()
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a category by ID - (FOR ADMIN).',
  })
  deleteCategory(@Param('id') id: number) {
    return this.deleteCategoryService.execute(+id);
  }
}

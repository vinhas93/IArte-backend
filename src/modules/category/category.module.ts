import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repository';
import {
  CreateCategoryService,
  DeleteCategoryService,
  FindAllCategoriesService,
  FindCategoryByIdService,
  FindCategoryByNameService,
  UpdateCategoryService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoryController],
  providers: [
    CreateCategoryService,
    CategoryRepository,
    FindCategoryByNameService,
    FindCategoryByIdService,
    FindAllCategoriesService,
    UpdateCategoryService,
    DeleteCategoryService,
  ],
})
export class CategoryModule {}

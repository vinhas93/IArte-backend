import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repository';
import {
  FindAllCategoriesService,
  FindCategoryByNameService,
  UpdateCategoryService,
} from './services';
import { CreateCategoryService } from './services/create-category.service';
import { DeleteCategoryService } from './services/delete-category.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CategoryController],
  providers: [
    CreateCategoryService,
    CategoryRepository,
    FindCategoryByNameService,
    FindAllCategoriesService,
    UpdateCategoryService,
    DeleteCategoryService,
  ],
})
export class CategoryModule {}

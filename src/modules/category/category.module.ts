import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repository';
import { CreateCategoryService } from './services/create-category.service';

@Module({
  imports: [],
  controllers: [CategoryController],
  providers: [CreateCategoryService, CategoryRepository],
})
export class CategoryModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PageOptionsDto } from 'src/shared/pagination-dtos/pageOptions.dto';
import { LoggedManager } from '../auth/decorator/logged-manager.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { CategoryByIdDto, CategoryByNameDto } from './dto/category-by-id.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  FindAllCategoriesDropdownService,
  FindCategoryByIdService,
  UpdateCategoryService,
} from './services';
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
    private findCategoryByIdService: FindCategoryByIdService,
    private findAllCategoriesService: FindAllCategoriesService,
    private findAllCategoriesDropdownService: FindAllCategoriesDropdownService,
    private updateCategoryService: UpdateCategoryService,
    private deleteCategoryService: DeleteCategoryService,
  ) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Create a new category - (FOR ADMIN).',
  })
  async createCategory(
    @LoggedManager() user: UserEntity,
    @Body() dto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.createCategoryService.execute(dto);
    return res.status(status).send(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Return all categories registered.',
  })
  async findAllCategories(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findAllCategoriesService.execute(
      pageOptionsDto,
    );

    return res.status(status).send(data);
  }

  @Get('/dropdown')
  @ApiOperation({
    summary: 'Return all categories registered.',
  })
  async findAllCategoriesDropdown(@Res() res: Response) {
    const { status, data } =
      await this.findAllCategoriesDropdownService.execute();

    return res.status(status).send(data);
  }

  @Get('/:name')
  @ApiOperation({
    summary: 'Return a category by name.',
  })
  async findCategoryByName(
    @Param() { name }: CategoryByNameDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findCategoryByNameService.execute(name);
    return res.status(status).send(data);
  }

  @Get('/id/:id')
  @ApiOperation({
    summary: 'Return a category by ID.',
  })
  async findCategoryById(
    @Param() { id }: CategoryByIdDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findCategoryByIdService.execute(+id);

    return res.status(status).send(data);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/:id')
  @ApiOperation({
    summary: 'Edit a category by ID - (FOR ADMIN).',
  })
  async updateCategory(
    @LoggedManager() user: UserEntity,
    @Param('id') id: number,
    @Body() dto: UpdateCategoryDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateCategoryService.execute(+id, dto);

    return res.status(status).send(data);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a category by ID - (FOR ADMIN).',
  })
  async deleteCategory(
    @LoggedManager() user: UserEntity,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const { status, data } = await this.deleteCategoryService.execute(+id);

    return res.status(status).send(data);
  }
}

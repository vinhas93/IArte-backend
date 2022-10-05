import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateCanvaDto } from './dtos/create-canva.dto';
import {
  CreateCanvaService,
  DeleteCanvaService,
  GetAllCanvasService,
  GetCanvaByIdService,
  GetCanvaBySearchService,
  UpdateCanvaByIdService,
} from './services';
import { Response } from 'express';
import { CanvaByIdDto, FilterBySearchDto } from './dtos/canva-by-id.dto';
import { UpdateCanvaDto } from './dtos/update-canva.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedSalesPerson } from '../auth/decorator/logged-sales-person.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { PageOptionsDto } from 'src/shared/pagination-dtos/pageOptions.dto';

@ApiTags('Canva')
@Controller('canva')
export class CanvaController {
  constructor(
    private createCanvaService: CreateCanvaService,
    private getCanvaByIdService: GetCanvaByIdService,
    private getAllCanvasService: GetAllCanvasService,
    private deleteCanvaService: DeleteCanvaService,
    private updateCanvaByIdService: UpdateCanvaByIdService,
    private getCanvaBySearchService: GetCanvaBySearchService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a canva. - (User`s but Customer)',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async createCanva(
    @LoggedSalesPerson() user: UserEntity,
    @Body() createCanvaDto: CreateCanvaDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.createCanvaService.execute(
      createCanvaDto,
    );

    return res.status(status).send(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Find all canvas.',
  })
  async getAllcanvas(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.getAllCanvasService.execute(
      pageOptionsDto,
    );

    return res.status(status).send(data);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find canva by id.',
  })
  async getCanvaById(@Param() { id }: CanvaByIdDto, @Res() res: Response) {
    const { status, data } = await this.getCanvaByIdService.execute(+id);

    return res.status(status).send(data);
  }

  @Get('/name/:name')
  @ApiOperation({
    summary: 'Search canva by name.',
  })
  async getCanvaByName(
    @Param() { name }: FilterBySearchDto,
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.getCanvaBySearchService.execute(
      name,
      pageOptionsDto,
    );

    return res.status(status).send(data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a canva. - (User`s but Customer)',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async updateCanvaById(
    @LoggedSalesPerson() user: UserEntity,
    @Param() { id }: CanvaByIdDto,
    @Body() updatecanva: UpdateCanvaDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateCanvaByIdService.execute(
      +id,
      updatecanva,
    );

    return res.status(status).send(data);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a canva. - (User`s but Customer)',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async deleteCanva(
    @LoggedSalesPerson() user: UserEntity,
    @Param() { id }: CanvaByIdDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.deleteCanvaService.execute(+id);

    return res.status(status).send(data);
  }
}

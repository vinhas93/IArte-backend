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
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PageOptionsDto } from 'src/shared/pagination-dtos/pageOptions.dto';
import { LoggedSalesPerson } from '../auth/decorator/logged-sales-person.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { CanvaByIdDto } from './dtos/canva-by-id.dto';
import { CreateCanvaDto } from './dtos/create-canva.dto';
import { DropdownDto } from './dtos/dropdown.dto';
import { SearchDto } from './dtos/search.dto';
import { UpdateCanvaDto } from './dtos/update-canva.dto';
import {
  CreateCanvaService,
  DeleteCanvaService,
  GetAllCanvasService,
  GetCanvaByIdService,
  GetCanvaBySearchService,
  UpdateCanvaByIdService,
} from './services';

@ApiTags('Canva')
@Controller()
export class CanvaController {
  constructor(
    private createCanvaService: CreateCanvaService,
    private getCanvaByIdService: GetCanvaByIdService,
    private getAllCanvasService: GetAllCanvasService,
    private deleteCanvaService: DeleteCanvaService,
    private updateCanvaByIdService: UpdateCanvaByIdService,
    private getCanvaBySearchService: GetCanvaBySearchService,
  ) {}

  @Post('canva')
  @ApiOperation({
    summary: 'Create a canva. - [SalesPerson][Manager][Owner]',
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

  @Get('canva')
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

  @Get('canva/:id')
  @ApiOperation({
    summary: 'Find canva by id.',
  })
  async getCanvaById(@Param() { id }: CanvaByIdDto, @Res() res: Response) {
    const { status, data } = await this.getCanvaByIdService.execute(+id);

    return res.status(status).send(data);
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search canva by name or id and filter by genre and/or category.',
  })
  async searchCanva(
    @Query() searchDto: SearchDto,
    @Query() dropdownDto: DropdownDto,
    @Query() pageOptionsDto: PageOptionsDto,

    @Res() res: Response,
  ) {
    const { status, data } = await this.getCanvaBySearchService.execute(
      dropdownDto,
      searchDto,
      pageOptionsDto,
    );

    return res.status(status).send(data);
  }

  @Put('canva/:id')
  @ApiOperation({
    summary: 'Update a canva. - [SalesPerson][Manager][Owner]',
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

  @Delete('canva/:id')
  @ApiOperation({
    summary: 'Delete a canva. - [SalesPerson][Manager][Owner]',
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

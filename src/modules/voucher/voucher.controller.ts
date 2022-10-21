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
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { LoggedManager } from '../auth/decorator/logged-manager.decorator';
import { UserEntity } from '../user/entity/user.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VoucherByIdDto } from './dto/voucher-by-id.dto';
import {
  CreateVoucherService,
  DeleteVoucherService,
  FindAllVouchersService,
} from './services';
import { FindVoucherByIdService } from './services/find-voucher-by-id.service';
import { UpdateVoucherService } from './services/update-voucher.service';

@ApiTags('Voucher')
@Controller('voucher')
export class VoucherController {
  constructor(
    private createVoucherService: CreateVoucherService,
    private findAllVouchersService: FindAllVouchersService,
    private findVoucherByIdService: FindVoucherByIdService,
    private updateVoucherService: UpdateVoucherService,
    private deleteVoucherService: DeleteVoucherService,
  ) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Create a new voucher - (FOR ADMIN).',
  })
  async createVoucher(
    @LoggedManager() user: UserEntity,
    @Body() dto: CreateVoucherDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.createVoucherService.execute(dto);
    return res.status(status).send(data);
  }

  @Get()
  @ApiOperation({
    summary: 'Return all vouchers registered.',
  })
  async findAllCategories(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.findAllVouchersService.execute(
      pageOptionsDto,
    );

    return res.status(status).send(data);
  }

  @Get('/id/:id')
  @ApiOperation({
    summary: 'Return a voucher by ID.',
  })
  async findVoucherById(@Param() { id }: VoucherByIdDto, @Res() res: Response) {
    const { status, data } = await this.findVoucherByIdService.execute(+id);

    return res.status(status).send(data);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/:id')
  @ApiOperation({
    summary: 'Edit a voucher by ID - (FOR ADMIN).',
  })
  async updateVoucher(
    @LoggedManager() user: UserEntity,
    @Param('id') id: number,
    @Body() dto: UpdateVoucherDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.updateVoucherService.execute(+id, dto);

    return res.status(status).send(data);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a voucher by ID - (FOR ADMIN).',
  })
  async deleteVoucher(
    @LoggedManager() user: UserEntity,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const { status, data } = await this.deleteVoucherService.execute(+id);

    return res.status(status).send(data);
  }
}

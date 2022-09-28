import { Body, Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { CreateCanvaDto } from './dtos/create-canva.dto';
import {
  CreateCanvaService,
  DeleteCanvaService,
  GetAllCanvasService,
  GetCanvaByIdService,
} from './services';
import { Response } from 'express';
import { CanvaByIdDto } from './dtos/canva-by-id.dto';

@Controller('canva')
export class CanvaController {
  constructor(
    private createCanvaService: CreateCanvaService,
    private getCanvaByIdService: GetCanvaByIdService,
    private getAllCanvasService: GetAllCanvasService,
    private deleteCanvaService: DeleteCanvaService,
  ) {}

  @Post()
  async createCanva(
    @Body() createCanvaDto: CreateCanvaDto,
    @Res() res: Response,
  ) {
    const { status, data } = await this.createCanvaService.execute(
      createCanvaDto,
    );

    return res.status(status).send(data);
  }

  @Get()
  async getAllcanvas(@Res() res: Response) {
    const { status, data } = await this.getAllCanvasService.execute();

    return res.status(status).send(data);
  }

  @Get(':id')
  async getCanvaById(@Param() { id }: CanvaByIdDto, @Res() res: Response) {
    const { status, data } = await this.getCanvaByIdService.execute(+id);

    return res.status(status).send(data);
  }

  @Delete(':id')
  async deleteCanva(@Param() { id }: CanvaByIdDto, @Res() res: Response) {
    const { status, data } = await this.deleteCanvaService.execute(+id);

    return res.status(status).send(data);
  }
}

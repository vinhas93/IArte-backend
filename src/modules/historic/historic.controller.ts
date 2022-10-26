import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetAllHistoryService } from './services/get-all-history.service';

@Controller('historic')
export class HistoricController {
  constructor(private getAllHistoryService: GetAllHistoryService) {}

  @Get()
  async getAllHistory(@Res() res: Response) {
    const { data, status } = await this.getAllHistoryService.execute();

    return res.status(status).send(data);
  }
}

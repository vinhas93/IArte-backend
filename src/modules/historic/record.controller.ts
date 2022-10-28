import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetAllRecordsService } from './services/get-all-records.service';

@Controller('record')
export class RecordController {
  constructor(private getAllRecordsService: GetAllRecordsService) {}

  @Get()
  async getAllRecords(@Res() res: Response) {
    const { data, status } = await this.getAllRecordsService.execute();

    return res.status(status).send(data);
  }
}

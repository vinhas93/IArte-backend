import { CreateRecordDto } from '../../modules/historic/dtos/create-record.dto';
import { Injectable } from '@nestjs/common';
import { UpdateCanvaDto } from 'src/modules/canva/dtos/update-canva.dto';
import { UpdateCanvaByIdService } from 'src/modules/canva/services';
import { CreateRecordService } from 'src/modules/historic/services/create-record.service';

type Message = {
  event: string;
  data: object;
};

type Data = {
  updateCanva: UpdateCanvaDto;
  createHistory: CreateRecordDto;
};

@Injectable()
export class SwitchService {
  constructor(
    private updateCanvaByIdService: UpdateCanvaByIdService,
    private createHistoryService: CreateRecordService,
  ) {}
  async execute(message: Message) {
    const { event, data } = message;

    switch (event) {
      case 'updateCanvas':
        const { createHistory, updateCanva } = data as Data;

        const { status } = await this.updateCanvaByIdService.execute(
          updateCanva.id,
          updateCanva,
        );

        if (status == 200) {
          return this.createHistoryService.execute(createHistory);
        }

        return {
          status: 400,
          data: 'Fail to create or update',
        };

      default:
        break;
    }

    return;
  }
}

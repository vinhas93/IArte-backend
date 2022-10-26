import { CreateHistoryDto } from './../../modules/historic/dtos/create-history.dto';
import { Injectable } from '@nestjs/common';
import { UpdateCanvaDto } from 'src/modules/canva/dtos/update-canva.dto';
import { UpdateCanvaByIdService } from 'src/modules/canva/services';
import { CreateHistoryService } from 'src/modules/historic/services/create-history.service';

type Message = {
  event: string;
  data: object;
};

type Data = {
  updateCanva: UpdateCanvaDto;
  createHistory: CreateHistoryDto;
};

@Injectable()
export class SwitchService {
  constructor(
    private updateCanvaByIdService: UpdateCanvaByIdService,
    private createHistoryService: CreateHistoryService,
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

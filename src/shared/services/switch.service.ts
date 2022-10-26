import { Injectable } from '@nestjs/common';
import { UpdateCanvaDto } from 'src/modules/canva/dtos/update-canva.dto';
import { UpdateCanvaByIdService } from 'src/modules/canva/services';

type Message = {
  event: string;
  data: object;
};

type Data = {
  updateCanva: UpdateCanvaDto;
  createHistory: object;
};

@Injectable()
export class SwitchService {
  constructor(private updateCanvaByIdService: UpdateCanvaByIdService) {}
  async execute(message: Message) {
    const { event, data } = message;

    switch (event) {
      case 'updateCanvas':
        const { createHistory, updateCanva } = data as Data;

        return this.updateCanvaByIdService.execute(updateCanva.id, updateCanva);

      default:
        break;
    }

    return;
  }
}

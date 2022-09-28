import { Injectable } from '@nestjs/common';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class GetCanvaBySearchService {
  constructor(public canvaRepository: CanvaRepository) {}

  async execute(search: string) {
    const canvas = await this.canvaRepository.search(search);

    if (canvas.length <= 0) {
      return {
        status: 200,
        data: { message: 'Canvas is empty' },
      };
    }

    return {
      status: 200,
      data: canvas,
    };
  }
}

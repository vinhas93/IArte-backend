import { Injectable } from '@nestjs/common';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class GetAllCanvasService {
  constructor(private canvaRepository: CanvaRepository) {}
  async execute() {
    const canvas = await this.canvaRepository.getAllCanvas();

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

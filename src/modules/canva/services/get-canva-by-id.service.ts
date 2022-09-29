import { Injectable } from '@nestjs/common';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class GetCanvaByIdService {
  constructor(private canvaRepository: CanvaRepository) {}

  async execute(id: number) {
    const canvaExists = await this.canvaRepository.getCanvaById(id);

    if (!canvaExists) {
      return {
        status: 400,
        data: { message: 'Canva not found' },
      };
    }

    return {
      status: 200,
      data: canvaExists,
    };
  }
}

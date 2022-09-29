import { Injectable } from '@nestjs/common';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class DeleteCanvaService {
  constructor(private canvaRepository: CanvaRepository) {}

  async execute(id: number) {
    const canvaExists = await this.canvaRepository.getCanvaById(id);

    if (!canvaExists) {
      return {
        status: 400,
        data: { message: 'Canva not found' },
      };
    }

    await this.canvaRepository.deleteCava(id);

    return {
      status: 200,
      data: { message: 'Canva deleted successfully' },
    };
  }
}

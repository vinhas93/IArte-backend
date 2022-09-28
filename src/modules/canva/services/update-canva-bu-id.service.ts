import { Injectable } from '@nestjs/common';
import { UpdateCanvaDto } from '../dtos/update-canva.dto';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class UpdateCanvaByIdService {
  constructor(private canvaRepository: CanvaRepository) {}

  async execute(id: number, data: UpdateCanvaDto) {
    const canvaExists = await this.canvaRepository.getCanvaById(id);

    if (!canvaExists) {
      return {
        status: 400,
        data: { message: 'Canva not found' },
      };
    }

    const updatedCanva = await this.canvaRepository.updateCanvaById(id, data);

    if (!updatedCanva) {
      return {
        status: 500,
        data: { message: 'Its not possible to update canva' },
      };
    }

    return {
      status: 200,
      data: updatedCanva,
    };
  }
}

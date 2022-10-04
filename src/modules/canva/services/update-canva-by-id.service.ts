import { Injectable } from '@nestjs/common';
import { UpdateCanvaDto } from '../dtos/update-canva.dto';
import { UpdateCanvaHelper } from '../helpers/update-canva.helper';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class UpdateCanvaByIdService {
  constructor(
    private canvaRepository: CanvaRepository,
    private canvaHelper: UpdateCanvaHelper,
  ) {}

  async execute(id: number, updateData: UpdateCanvaDto) {
    const { status, data } = await this.canvaHelper.execute(id, updateData);

    if (status !== 200) {
      return {
        status,
        data,
      };
    }

    const canvaExists = await this.canvaRepository.getCanvaById(id);

    if (!canvaExists) {
      return {
        status: 400,
        data: { message: 'Canva not found' },
      };
    }

    const updatedCanva = await this.canvaRepository.updateCanvaById(
      id,
      updateData,
    );

    return {
      status: 200,
      data: updatedCanva,
    };
  }
}

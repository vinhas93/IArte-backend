import { Injectable } from '@nestjs/common';
import { CreateCanvaDto } from '../dtos/create-canva.dto';
import { CreateCanvaHelper } from '../helpers/create-canva.helper';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class CreateCanvaService {
  constructor(
    private canvaRepository: CanvaRepository,
    private createCanvaHelper: CreateCanvaHelper,
  ) {}

  async execute(createData: CreateCanvaDto) {
    const { status, data } = await this.createCanvaHelper.execute(createData);

    if (status !== 200) {
      return {
        status,
        data,
      };
    }

    const createCanva = await this.canvaRepository.createCanva(createData);

    return {
      status: 201,
      data: createCanva,
    };
  }
}

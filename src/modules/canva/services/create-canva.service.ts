import { Injectable } from '@nestjs/common';
import { CreateCanvaDto } from '../dtos/create-canva.dto';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class CreateCanvaService {
  constructor(private canvaRepository: CanvaRepository) {}

  async execute(data: CreateCanvaDto) {
    const createCanva = await this.canvaRepository.createCanva(data);

    return {
      status: 201,
      data: createCanva,
    };
  }
}

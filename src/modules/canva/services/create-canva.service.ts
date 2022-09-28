import { Injectable } from '@nestjs/common';
import { CreateCanvaDto } from '../dtos/create-canva.dto';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class CreateCanvaService {
  constructor(private canvaRepository: CanvaRepository) {}

  async execute(data: CreateCanvaDto) {
    const cretaeCanva = await this.canvaRepository.createCanva(data);

    return {
      status: 201,
      data: cretaeCanva,
    };
  }
}

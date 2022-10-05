import { Injectable } from '@nestjs/common';
import { PageDto, PageMetaDto } from 'src/shared/pagination-dtos';
import { PageOptionsDto } from 'src/shared/pagination-dtos/pageOptions.dto';
import { CanvaRepository } from './../repository/canva.repository';

@Injectable()
export class GetAllCanvasService {
  constructor(private canvaRepository: CanvaRepository) {}
  async execute(pageOptionsDto: PageOptionsDto) {
    const canvas = await this.canvaRepository.findAllCanvasByParams(
      pageOptionsDto,
    );

    const allCanvas = await this.canvaRepository.getAllCanvas();

    const itemCount = allCanvas.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(canvas, pageMetaDto);

    if (canvas.length <= 0) {
      return {
        status: 200,
        data: { message: 'Canvas is empty' },
      };
    }

    return {
      status: 200,
      data: response,
    };
  }
}

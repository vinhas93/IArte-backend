import { Injectable } from '@nestjs/common';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/shared/pagination-dtos';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class GetCanvaBySearchService {
  constructor(public canvaRepository: CanvaRepository) {}

  async execute(search: string, pageOptionsDto: PageOptionsDto) {
    const canvas = await this.canvaRepository.search(search, pageOptionsDto);

    const allCanvaSearch = await this.canvaRepository.getAllCanvas(search);

    const itemCount = allCanvaSearch.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(canvas, pageMetaDto);

    if (canvas.length <= 0) {
      return {
        status: 200,
        data: response,
      };
    }

    return {
      status: 200,
      data: response,
    };
  }
}

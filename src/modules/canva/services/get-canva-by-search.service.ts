import { Injectable } from '@nestjs/common';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/shared/pagination-dtos';
import { FilterBySearchDto } from '../dtos/canva-by-id.dto';
import { SearchHelper } from '../helpers/search.helper';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class GetCanvaBySearchService {
  constructor(
    private canvaRepository: CanvaRepository,
    private searchHelper: SearchHelper,
  ) {}

  async execute(search: FilterBySearchDto, pageOptionsDto: PageOptionsDto) {
    const { canvaSearchComplete, canvaSearchPaginated } =
      await this.searchHelper.execute(search, pageOptionsDto);

    const { id } = search;

    const canvasById = [await this.canvaRepository.getCanvaById(+id)];

    if (canvasById.length > 0) {
      canvaSearchComplete.unshift(canvasById[0]);
      canvaSearchPaginated.unshift(canvasById[0]);
    }

    const itemCount = canvaSearchComplete.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(canvaSearchPaginated, pageMetaDto);

    return {
      status: 200,
      data: response,
    };
  }
}

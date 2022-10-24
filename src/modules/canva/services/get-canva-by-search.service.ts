import { Injectable } from '@nestjs/common';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/shared/pagination-dtos';
import { FilterBySearchDto } from '../dtos/canva-by-id.dto';
import { SearchHelper } from '../helpers/search.helper';

@Injectable()
export class GetCanvaBySearchService {
  constructor(private searchHelper: SearchHelper) {}

  async execute(search: FilterBySearchDto, pageOptionsDto: PageOptionsDto) {
    const { canvasSearchComplete, canvasSearchPaginated } =
      await this.searchHelper.execute(search, pageOptionsDto);

    const itemCount = canvasSearchComplete.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(canvasSearchPaginated, pageMetaDto);

    return {
      status: 200,
      data: response,
    };
  }
}

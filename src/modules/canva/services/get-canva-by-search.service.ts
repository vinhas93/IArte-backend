import { Injectable } from '@nestjs/common';
import {
  PageDto,
  PageMetaDto,
  PageOptionsDto,
} from 'src/shared/pagination-dtos';
import { DropdownDto } from '../dtos/dropdown.dto';
import { SearchDto } from '../dtos/search.dto';
import { SearchHelper } from '../helpers/search.helper';

@Injectable()
export class GetCanvaBySearchService {
  constructor(private searchHelper: SearchHelper) {}

  async execute(
    dropdownDto: DropdownDto,
    searchDto: SearchDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    const data = await this.searchHelper.execute(
      dropdownDto,
      searchDto,
      pageOptionsDto,
    );
    if (!data) {
      return {
        status: 200,
        data: { message: 'There is no such product code.' },
      };
    }
    const { canvasSearchComplete, canvasSearchPaginated } = data;

    const itemCount = canvasSearchComplete.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(canvasSearchPaginated, pageMetaDto);

    return {
      status: 200,
      data: response,
    };
  }
}

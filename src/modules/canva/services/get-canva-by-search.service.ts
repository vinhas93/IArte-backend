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
    searchDto: SearchDto,
    dropdownDto: DropdownDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    console.log(`dropdown: ${dropdownDto}`);
    console.log(`searchDto: ${searchDto}`);
    console.log(`search: ${searchDto[0]} e ${searchDto[1]}`);

    const { canvasSearchComplete, canvasSearchPaginated } =
      await this.searchHelper.execute(searchDto, dropdownDto, pageOptionsDto);

    const itemCount = canvasSearchComplete.length;

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });

    const response = new PageDto(canvasSearchPaginated, pageMetaDto);

    return {
      status: 200,
      data: response,
    };
  }
}

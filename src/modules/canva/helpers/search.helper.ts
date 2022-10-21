import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { DropdownDto } from '../dtos/dropdown.dto';
import { SearchDto } from '../dtos/search.dto';

import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class SearchHelper {
  constructor(private canvasRepository: CanvaRepository) {}
  async execute(
    searchDto: SearchDto,
    dropdownDto: DropdownDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    /* O objetivo desse Helper é validar quais informações a barra de busca 
    está enviando pro servidor. Identificando, ele gera uma lista completa e
    uma lista com a paginação retornando ambas pro service. */
    const data = {
      canvasSearchPaginated: [],
      canvasSearchComplete: [],
    };
    const canvasById = [];

    // console.log(`dropdown: ${dropdownDto}`);
    // console.log(`searchDto: ${searchDto}`);
    // console.log(`search: ${searchDto[0]} e ${searchDto[1]}`);

    if (!dropdownDto) {
      data.canvasSearchComplete = await this.canvasRepository.getAllCanvas(
        searchDto.name,
      );
      data.canvasSearchPaginated =
        await this.canvasRepository.getAllCanvasPaginated(
          searchDto.name,
          pageOptionsDto,
        );
    } else if (!dropdownDto.genre) {
      data.canvasSearchComplete =
        await this.canvasRepository.filterCanvasByCategoryComplete(
          searchDto.name,
          dropdownDto.categoryName,
        );
      data.canvasSearchPaginated =
        await this.canvasRepository.filterCanvasByCategoryPaginated(
          searchDto.name,
          dropdownDto.categoryName,
          pageOptionsDto,
        );
    } else if (!dropdownDto.categoryName) {
      data.canvasSearchComplete =
        await this.canvasRepository.filterCanvasByGenreComplete(
          searchDto.name,
          dropdownDto.genre,
        );
      data.canvasSearchPaginated =
        await this.canvasRepository.filterCanvasByGenrePaginated(
          searchDto.name,
          dropdownDto.genre,
          pageOptionsDto,
        );
    } else {
      data.canvasSearchComplete =
        await this.canvasRepository.filterCanvasDropdownComplete(
          searchDto.name,
          dropdownDto.genre,
          dropdownDto.categoryName,
        );
      data.canvasSearchPaginated =
        await this.canvasRepository.filterCanvasDropdownPaginated(
          searchDto.name,
          dropdownDto.genre,
          dropdownDto.categoryName,
          pageOptionsDto,
        );
    }

    if (searchDto.id) {
      canvasById.push(
        await this.canvasRepository.getCanvaById(parseInt(searchDto.id)),
      );
    }

    if (canvasById.length > 0) {
      data.canvasSearchComplete.unshift(canvasById[0]);
      data.canvasSearchPaginated.unshift(canvasById[0]);
    }

    return data;
  }
}

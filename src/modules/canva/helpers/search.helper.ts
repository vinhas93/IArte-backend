import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { DropdownDto } from '../dtos/dropdown.dto';
import { SearchDto } from '../dtos/search.dto';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class SearchHelper {
  constructor(private canvasRepository: CanvaRepository) {}
  async execute(
    dropdown: DropdownDto,
    searchDto: SearchDto,
    pageOptionsDto: PageOptionsDto,
  ) {
    /* O objetivo desse Helper é validar quais informações a barra de busca 
    está enviando pro servidor. Identificando, ele gera uma lista completa e
    uma lista com a paginação retornando ambas pro service. */
    const data = {
      canvasSearchPaginated: [],
      canvasSearchComplete: [],
    };
    const { search } = searchDto;

    const searchIsANumber = parseInt(search);

    if (!isNaN(searchIsANumber)) {
      const canvasById = [
        await this.canvasRepository.getCanvaById(searchIsANumber),
      ];

      if (canvasById[0] != null) {
        data.canvasSearchComplete.unshift(canvasById[0]);
        data.canvasSearchPaginated.unshift(canvasById[0]);
      } else {
        return false;
      }
    } else {
      if (dropdown.genre && dropdown.categoryName) {
        data.canvasSearchComplete =
          await this.canvasRepository.filterCanvasDropdownComplete(
            search,
            dropdown.genre,
            dropdown.categoryName,
          );
        data.canvasSearchPaginated =
          await this.canvasRepository.filterCanvasDropdownPaginated(
            search,
            dropdown.genre,
            dropdown.categoryName,
            pageOptionsDto,
          );
      } else if (dropdown.genre) {
        data.canvasSearchComplete =
          await this.canvasRepository.filterCanvasByGenreComplete(
            search,
            dropdown.genre,
          );
        data.canvasSearchPaginated =
          await this.canvasRepository.filterCanvasByGenrePaginated(
            search,
            dropdown.genre,
            pageOptionsDto,
          );
      } else if (dropdown.categoryName) {
        data.canvasSearchComplete =
          await this.canvasRepository.filterCanvasByCategoryComplete(
            search,
            dropdown.categoryName,
          );
        data.canvasSearchPaginated =
          await this.canvasRepository.filterCanvasByCategoryPaginated(
            search,
            dropdown.categoryName,
            pageOptionsDto,
          );
      } else {
        data.canvasSearchComplete = await this.canvasRepository.getAllCanvas(
          search,
        );
        data.canvasSearchPaginated =
          await this.canvasRepository.getAllCanvasPaginated(
            search,
            pageOptionsDto,
          );
      }
    }

    return data;
  }
}

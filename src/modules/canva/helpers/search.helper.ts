import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { FilterBySearchDto } from '../dtos/canva-by-id.dto';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class SearchHelper {
  constructor(private canvasRepository: CanvaRepository) {}
  async execute(search: FilterBySearchDto, pageOptionsDto: PageOptionsDto) {
    /* O objetivo desse Helper é validar quais informações a barra de busca 
    está enviando pro servidor. Identificando, ele gera uma lista completa e
    uma lista com a paginação retornando ambas pro service. */
    const data = {
      canvasSearchPaginated: [],
      canvasSearchComplete: [],
    };
    const { id, name, genre, categoryName } = search;

    if (genre && categoryName) {
      data.canvasSearchComplete =
        await this.canvasRepository.filterCanvasDropdownComplete(
          name,
          genre,
          categoryName,
        );
      data.canvasSearchPaginated =
        await this.canvasRepository.filterCanvasDropdownPaginated(
          name,
          genre,
          categoryName,
          pageOptionsDto,
        );
    } else if (genre) {
      data.canvasSearchComplete =
        await this.canvasRepository.filterCanvasByGenreComplete(name, genre);
      data.canvasSearchPaginated =
        await this.canvasRepository.filterCanvasByGenrePaginated(
          name,
          genre,
          pageOptionsDto,
        );
    } else if (categoryName) {
      data.canvasSearchComplete =
        await this.canvasRepository.filterCanvasByCategoryComplete(
          name,
          categoryName,
        );
      data.canvasSearchPaginated =
        await this.canvasRepository.filterCanvasByCategoryPaginated(
          name,
          categoryName,
          pageOptionsDto,
        );
    } else {
      data.canvasSearchComplete = await this.canvasRepository.getAllCanvas(
        name,
      );
      data.canvasSearchPaginated =
        await this.canvasRepository.getAllCanvasPaginated(name, pageOptionsDto);
    }

    const canvasById = [await this.canvasRepository.getCanvaById(+id)];

    if (canvasById.length > 0) {
      data.canvasSearchComplete.unshift(canvasById[0]);
      data.canvasSearchPaginated.unshift(canvasById[0]);
    }

    return data;
  }
}

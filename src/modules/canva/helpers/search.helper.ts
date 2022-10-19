import { Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/shared/pagination-dtos';
import { FilterBySearchDto } from '../dtos/canva-by-id.dto';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class SearchHelper {
  constructor(private canvasRepositry: CanvaRepository) {}
  async execute(search: FilterBySearchDto, pageOptionsDto: PageOptionsDto) {
    const data = {
      canvaSearchPaginated: [],
      canvaSearchComplete: [],
    };
    const { name, genre, categoryName } = search;

    if (genre && categoryName) {
      data.canvaSearchComplete =
        await this.canvasRepositry.filterCanvasDropdownComplete(
          name,
          genre,
          categoryName,
        );
      data.canvaSearchPaginated =
        await this.canvasRepositry.filterCanvasDropdownPaginated(
          name,
          genre,
          categoryName,
          pageOptionsDto,
        );
    } else if (genre) {
      data.canvaSearchComplete =
        await this.canvasRepositry.filterCanvasByGenreComplete(name, genre);
      data.canvaSearchPaginated =
        await this.canvasRepositry.filterCanvasByGenrePaginated(
          name,
          genre,
          pageOptionsDto,
        );
    } else if (categoryName) {
      data.canvaSearchComplete =
        await this.canvasRepositry.filterCanvasByCategoryComplete(
          name,
          categoryName,
        );
      data.canvaSearchPaginated =
        await this.canvasRepositry.filterCanvasByCategoryPaginated(
          name,
          categoryName,
          pageOptionsDto,
        );
    } else {
      data.canvaSearchComplete = await this.canvasRepositry.getAllCanvas(name);
      data.canvaSearchPaginated =
        await this.canvasRepositry.getAllCanvasPaginated(name, pageOptionsDto);
    }
    return data;
  }
}

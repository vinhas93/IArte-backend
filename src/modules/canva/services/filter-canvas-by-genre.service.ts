import { Injectable } from '@nestjs/common';
import { CanvaGenre } from '@prisma/client';
import { CanvaRepository } from '../repository/canva.repository';

@Injectable()
export class FilterCanvasByGenreService {
  constructor(private canvaRepository: CanvaRepository) {}

  async execute(genre: CanvaGenre) {
    const genreExists = await this.canvaRepository.filterCanvasByGenre(genre);

    if (genreExists.length < 1) {
      return {
        status: 404,
        data: { message: 'Genre not Found!' },
      };
    }

    return {
      status: 200,
      data: genreExists,
    };
  }
}

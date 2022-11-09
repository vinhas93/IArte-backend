import { Injectable } from '@nestjs/common';
import { BatchUpdateStatusRepository } from '../repository/batch-update-status.repository';

@Injectable()
export class FindOneBatchUpdateCanvasService {
  constructor(
    private batchUpdateStatusRepository: BatchUpdateStatusRepository,
  ) {}

  async execute(id: number) {
    const statusExists = await this.batchUpdateStatusRepository.findOne(id);

    if (!statusExists) {
      return {
        status: 404,
        data: { message: 'Status not found' },
      };
    }

    return {
      status: 200,
      data: statusExists,
    };
  }
}

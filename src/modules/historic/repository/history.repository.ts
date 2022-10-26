import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateHistoryDto } from '../dtos/create-history.dto';
import { HistoryEntity } from '../entity/history.entity';

export class HistoryRepository extends PrismaClient {
  async createHistory(data: CreateHistoryDto): Promise<HistoryEntity> {
    return this.bulkUpdateRecords.create({ data }).catch(handleError);
  }

  async findAllHistory(): Promise<HistoryEntity[]> {
    return this.bulkUpdateRecords.findMany().catch(handleError);
  }
}

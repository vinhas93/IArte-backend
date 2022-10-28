import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateRecordDto } from '../dtos/create-record.dto';
import { RecordEntity } from '../entity/record.entity';

export class RecordRepository extends PrismaClient {
  async createRecord(data: CreateRecordDto): Promise<RecordEntity> {
    return this.bulkUpdateRecords.create({ data }).catch(handleError);
  }

  async findAllRecords(): Promise<RecordEntity[]> {
    return this.bulkUpdateRecords.findMany().catch(handleError);
  }
}

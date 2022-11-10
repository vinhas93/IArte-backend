import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';
import { CreateRecordDto } from '../dtos/create-record.dto';
import { RecordEntity } from '../entity/record.entity';

export class RecordRepository extends PrismaClient {
  async createRecord(data: CreateRecordDto): Promise<RecordEntity> {
    return this.batchUpdateRecords.create({ data }).catch(handleError);
  }
}

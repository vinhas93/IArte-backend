import { PrismaClient } from '@prisma/client';
import { handleError } from 'src/shared/utils/handle-error.util';

export class BatchUpdateStatusRepository extends PrismaClient {
  async create(data: any) {
    return this.batchUpdateStatus.create({ data }).catch(handleError);
  }

  async update(data: any, id: number) {
    return this.batchUpdateStatus
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }
}

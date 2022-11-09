import { Prisma, PrismaClient } from '@prisma/client';
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

  async findOne(id: number) {
    const prisma = new PrismaClient();

    const data = await prisma
      .$queryRaw(
        Prisma.sql`select status.id, users.name as user_name, canvas.name as canva_name, canvas.id as canva_id, 
        records.new_price, records.old_price, records.status_message, status.created_at from 
        
        batch_update_status as status
        left join batch_update_records as records
        on records.at_status = status.id
        left join canvas
        on records.canva_id = canvas.id
        left join users
        on status.user_id = users.id
        where status.id = ${id}
    `,
      )
      .catch(handleError);

    return data;
  }

  async findAll() {
    const data = await this.batchUpdateStatus
      .findMany({
        select: {
          id: true,
          user: { select: { name: true } },
          createdAt: true,
        },
      })
      .catch(handleError);
    return {
      status: 200,
      data,
    };
  }
}

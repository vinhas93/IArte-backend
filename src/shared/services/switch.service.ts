import { CreateRecordDto } from '../../modules/historic/dtos/create-record.dto';
import { Injectable } from '@nestjs/common';
import { UpdateCanvaDto } from 'src/modules/canva/dtos/update-canva.dto';
import { UpdateCanvaByIdService } from 'src/modules/canva/services';
import { CreateRecordService } from 'src/modules/historic/services/create-record.service';
import { BatchUpdateStatusRepository } from 'src/modules/upload/repository/batch-update-status.repository';
import { SendEmailBatchStatusUpdate } from './send-email-batch-status-update.service';

type Message = {
  event: string;
  data: object;
};

type Data = {
  updateCanva: UpdateCanvaDto;
  createHistory: CreateRecordDto;
  batchUpdateStatus: {
    id: number;
  };
};

@Injectable()
export class SwitchService {
  constructor(
    private updateCanvaByIdService: UpdateCanvaByIdService,
    private createHistoryService: CreateRecordService,
    private batchUpdateStatusRepository: BatchUpdateStatusRepository,
    private sendEmailBatchStatusUpdate: SendEmailBatchStatusUpdate,
  ) {}
  async execute(message: Message) {
    const { event, data } = message;

    switch (event) {
      case 'updateCanvas':
        const { createHistory, updateCanva, batchUpdateStatus } = data as Data;

        const { status } = await this.updateCanvaByIdService.execute(
          updateCanva.id,
          updateCanva,
        );

        if (status == 200) {
          await this.sendEmailBatchStatusUpdate.execute(
            createHistory,
            batchUpdateStatus,
            {
              successes: {
                increment: 1,
              },
            },
          );
          return this.createHistoryService.execute(createHistory);
        }

        await this.sendEmailBatchStatusUpdate.execute(
          createHistory,
          batchUpdateStatus,
          {
            failures: {
              increment: 1,
            },
          },
        );

        return {
          status: 400,
          data: 'Fail to create or update',
        };

      default:
        break;
    }

    return;
  }
}

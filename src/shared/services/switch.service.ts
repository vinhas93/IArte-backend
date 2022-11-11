import { Injectable } from '@nestjs/common';
import { UpdateCanvaDto } from 'src/modules/canva/dtos/update-canva.dto';
import { UpdateCanvaByIdService } from 'src/modules/canva/services';
import { CreateRecordDto } from 'src/modules/record/dtos/create-record.dto';
import { CreateRecordService } from 'src/modules/record/services/create-record.service';

import { SendEmailBatchStatusUpdate } from './send-email-batch-status-update.service';

type Message = {
  event: string;
  data: object;
};

type Data = {
  updateCanva: UpdateCanvaDto;
  createRecord: CreateRecordDto;
  batchUpdateStatus: {
    id: number;
  };
};

@Injectable()
export class SwitchService {
  constructor(
    private updateCanvaByIdService: UpdateCanvaByIdService,
    private createRecordService: CreateRecordService,
    private sendEmailBatchStatusUpdate: SendEmailBatchStatusUpdate,
  ) {}
  async execute(message: Message) {
    const { event, data } = message;

    switch (event) {
      case 'updateCanvas':
        const { createRecord, updateCanva, batchUpdateStatus } = data as Data;

        if (updateCanva.id != null) {
          const { status } = await this.updateCanvaByIdService.execute(
            updateCanva.id,
            updateCanva,
          );

          if (status == 200) {
            createRecord.statusMessage = 'Updated successfully.';
            await this.sendEmailBatchStatusUpdate.execute(batchUpdateStatus, {
              successes: {
                increment: 1,
              },
            });
            return this.createRecordService.execute(createRecord);
          }
        }

        return;

      default:
        break;
    }

    return;
  }
}

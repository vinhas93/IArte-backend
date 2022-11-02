import * as Papa from 'papaparse';
import * as Fs from 'fs';
import { Injectable } from '@nestjs/common';
import { SendDataToSqsHelper } from '../helpers/send-data-to-sqs.helper';
import { BatchUpdateStatusRepository } from '../repository/batch-update-status.repository';

@Injectable()
export class BatchUpdateCanvasService {
  constructor(
    private sendDataToSqsHelper: SendDataToSqsHelper,
    private batchUpdateStatusRepository: BatchUpdateStatusRepository,
  ) {}

  async execute(file, user) {
    const csvFile = Fs.readFileSync(file.path);
    const csvData = csvFile.toString('utf-8');
    const batchUpdate: Array<any> = await new Promise((resolve) => {
      Papa.parse(csvData, {
        header: true,
        delimiter: ';',
        // delimitersToGuess: [
        //   ',',
        //   '\t',
        //   '|',
        //   ';',
        //   Papa.RECORD_SEP,
        //   Papa.UNIT_SEP,
        // ],
        complete: async (results) => {
          resolve(results.data);
        },
      });
    });

    if (batchUpdate.length > 0) {
      const batchUpdateStatus = await this.batchUpdateStatusRepository.create({
        totalItensUpdate: batchUpdate.length - 1,
      });
      for (const canva of batchUpdate) {
        await this.sendDataToSqsHelper.execute(
          canva,
          user,
          batchUpdateStatus.id,
        );
      }
    }

    return 'Suas solicitações serão processadas e em breve você receberá um email informando sobre as alterações';
  }
}

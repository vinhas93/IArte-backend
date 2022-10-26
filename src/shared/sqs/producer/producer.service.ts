import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class MessageProducer {
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: any) {
    const message: any = JSON.stringify(body);

    try {
      await this.sqsService.send(process.env.SQS_QUEUE_NAME, {
        body: message,
        id: uuidV4(),
        delaySeconds: 0,
      });
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { SwitchService } from 'src/shared/services/switch.service';

type Message = {
  event: string;
  data: object;
};

@Injectable()
export class MessageHandler {
  constructor(private switchService: SwitchService) {}

  @SqsMessageHandler(process.env.SQS_QUEUE_NAME, false)
  async handleMessage(message: AWS.SQS.Message) {
    const obj = JSON.parse(message.Body) as Message;

    const { data, status } = await this.switchService.execute(obj);

    return {
      status,
      data,
    };
  }
}

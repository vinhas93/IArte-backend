import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';
import { SwitchService } from 'src/shared/services/switch.service';
import { CanvaModule } from 'src/modules/canva/canva.module';
import { RecordModule } from 'src/modules/historic/record.module';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Module({
  imports: [
    CanvaModule,
    RecordModule,
    SqsModule.register({
      consumers: [
        {
          name: process.env.SQS_QUEUE_NAME,
          queueUrl: process.env.SQS_QUEUE_URL,
          region: process.env.AWS_REGION,
        },
      ],
      producers: [],
    }),
  ],
  controllers: [],
  providers: [MessageHandler, SwitchService],
})
export class ConsumerModule {}

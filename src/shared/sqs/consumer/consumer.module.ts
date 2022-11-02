import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { CanvaModule } from 'src/modules/canva/canva.module';
import { RecordModule } from 'src/modules/historic/record.module';
import { MailModule } from 'src/modules/mails/mail.module';
import { UploadModule } from 'src/modules/upload/upload.module';
import { UserModule } from 'src/modules/user/user.module';
import { SendEmailBatchStatusUpdate } from 'src/shared/services/send-email-batch-status-update.service';
import { SwitchService } from 'src/shared/services/switch.service';
import { MessageHandler } from './messageHandler';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@Module({
  imports: [
    MailModule,
    UploadModule,
    CanvaModule,
    RecordModule,
    UserModule,
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
  providers: [MessageHandler, SwitchService, SendEmailBatchStatusUpdate],
})
export class ConsumerModule {}

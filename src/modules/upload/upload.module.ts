import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SendEmailBatchStatusUpdate } from 'src/shared/services/send-email-batch-status-update.service';
import { ProducerModule } from 'src/shared/sqs/producer/producer.module';
import { CanvaModule } from '../canva/canva.module';
import { CategoryRepository } from '../category/repository/category.repository';
import { UserModule } from '../user/user.module';
import { SendDataToSqsHelper } from './helpers/send-data-to-sqs.helper';
import { BatchUpdateStatusRepository } from './repository/batch-update-status.repository';
import { BatchUpdateCanvasService } from './services/batch-update-canvas.service';
import { FileUploadService } from './services/upload-image.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    ProducerModule,
    UserModule,
    CanvaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UploadController],
  providers: [
    FileUploadService,
    BatchUpdateCanvasService,
    SendDataToSqsHelper,
    BatchUpdateStatusRepository,
    CategoryRepository,
    SendEmailBatchStatusUpdate,
  ],
  exports: [BatchUpdateStatusRepository],
})
export class UploadModule {}

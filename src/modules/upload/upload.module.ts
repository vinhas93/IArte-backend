import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProducerModule } from 'src/shared/sqs/producer/producer.module';
import { CanvaModule } from '../canva/canva.module';
import { UserModule } from '../user/user.module';
import { SendDataToSqsHelper } from './helpers/send-data-to-sqs.helper';
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
  providers: [FileUploadService, BatchUpdateCanvasService, SendDataToSqsHelper],
})
export class UploadModule {}

import { Module } from '@nestjs/common';
import { AxiosProvider } from 'src/shared/providers/axios/axios.provider';
import { ConvertLinkHelper } from './helpers/convert-link.helper';
import { UploadImageService } from './services/upload-image.service';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  providers: [UploadImageService, ConvertLinkHelper, AxiosProvider],
})
export class UploadModule {}

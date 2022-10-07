import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { UploadImageService } from './services/upload-image.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadImageService: UploadImageService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload images',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Res() res: Response) {
    const { status, data } = await this.uploadImageService.execute(file);

    return res.status(status).send(data);
  }
}

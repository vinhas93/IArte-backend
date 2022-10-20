import {
  BadRequestException,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { BatchUpdateCanvasService } from './services/batch-update-canvas.service';
import { FileUploadService } from './services/upload-image.service';

@ApiTags('Upload')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(
    private fileUploadService: FileUploadService,
    private batchUpdateCanvasService: BatchUpdateCanvasService,
  ) {}

  @Post()
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
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (
        req: any,
        file: { mimetype: string },
        cb: (error: Error | null, acceptFile: boolean) => void,
      ) => {
        if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only use jpg or png files'), false);
        }
      },
    }),
  )
  async upload(@LoggedUser() user: User, @UploadedFile() file) {
    const response = await this.fileUploadService.upload(file);

    if (response.Location) {
      return { url: response.Location };
    }

    return response;
  }

  @Patch('batch_update')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    const response = await this.batchUpdateCanvasService.execute(file);

    return response;
  }
}

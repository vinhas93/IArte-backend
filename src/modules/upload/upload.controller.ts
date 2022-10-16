import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from '../auth/decorator/logged-user.decorator';
import { FileUploadService } from './services/upload-image.service';

@ApiTags('Upload')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(private fileUploadService: FileUploadService) {}

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
}

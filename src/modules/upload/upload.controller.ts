import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LoggedManager } from '../auth/decorator/logged-manager.decorator';
import { BatchUpdateStatusRepository } from './repository/batch-update-status.repository';
import { BatchUpdateCanvasService } from './services/batch-update-canvas.service';
import { FindOneBatchUpdateCanvasService } from './services/find-one-batch-update-canvas.service';
import { FileUploadService } from './services/upload-image.service';

@ApiTags('Upload')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(
    private fileUploadService: FileUploadService,
    private batchUpdateCanvasService: BatchUpdateCanvasService,
    private batchUpdateStatusRepository: BatchUpdateStatusRepository,
    private findOneBatchUpdateCanvasService: FindOneBatchUpdateCanvasService,
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
  async upload(@LoggedManager() user: User, @UploadedFile() file) {
    const response = await this.fileUploadService.upload(file);

    if (response.Location) {
      return { url: response.Location };
    }

    return response;
  }

  @Patch('batch_update')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
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
  async uploadFile(@LoggedManager() user: User, @UploadedFile() file) {
    const response = await this.batchUpdateCanvasService.execute(file, user);

    return response;
  }

  @Get('status')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async findAll(@LoggedManager() user: User, @Res() res: Response) {
    const { status, data } = await this.batchUpdateStatusRepository.findAll();
    return res.status(status).send(data);
  }

  @Get('status/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async findOne(
    @LoggedManager() user: User,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    const { status, data } = await this.findOneBatchUpdateCanvasService.execute(
      +id,
    );
    return res.status(status).send(data);
  }
}

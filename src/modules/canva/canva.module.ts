import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryRepository } from '../category/repository/category.repository';
import { CanvaController } from './canva.controller';
import { CreateCanvaHelper } from './helpers/create-canva.helper';
import { UpdateCanvaHelper } from './helpers/update-canva.helper';
import { CanvaRepository } from './repository/canva.repository';
import {
  CreateCanvaService,
  DeleteCanvaService,
  GetAllCanvasService,
  GetCanvaByIdService,
  GetCanvaBySearchService,
  UpdateCanvaByIdService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CanvaController],
  providers: [
    CreateCanvaService,
    CanvaRepository,
    GetCanvaByIdService,
    GetAllCanvasService,
    DeleteCanvaService,
    UpdateCanvaByIdService,
    GetCanvaBySearchService,
    CategoryRepository,
    CreateCanvaHelper,
    UpdateCanvaHelper,
  ],
})
export class CanvaModule {}

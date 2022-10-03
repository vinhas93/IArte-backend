import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CategoryRepository } from '../category/repository/category.repository';
import { CanvaController } from './canva.controller';
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
  ],
})
export class CanvaModule {}

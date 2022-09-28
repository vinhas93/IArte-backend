import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CanvaController } from './canva.controller';
import { CanvaRepository } from './repository/canva.repository';
import {
  CreateCanvaService,
  DeleteCanvaService,
  GetAllCanvasService,
  GetCanvaByIdService,
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
  ],
})
export class CanvaModule {}

import { Module } from '@nestjs/common';
import { CanvaModule } from '../canva/canva.module';
import { UserModule } from '../user/user.module';
import { HistoricController } from './historic.controller';
import { HistoryRepository } from './repository/history.repository';
import { CreateHistoryService } from './services/create-history.service';

@Module({
  imports: [UserModule, CanvaModule],
  controllers: [HistoricController],
  providers: [CreateHistoryService, HistoryRepository],
  exports: [CreateHistoryService],
})
export class HistoricModule {}

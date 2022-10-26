import { Module } from '@nestjs/common';
import { CanvaModule } from '../canva/canva.module';
import { UserModule } from '../user/user.module';
import { HistoricController } from './historic.controller';
import { CreateHistoryService } from './services/create-history.service';

@Module({
  imports: [UserModule, CanvaModule],
  controllers: [HistoricController],
  providers: [CreateHistoryService],
})
export class HistoricModule {}

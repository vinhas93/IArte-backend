import { Module } from '@nestjs/common';
import { CanvaModule } from '../canva/canva.module';
import { UserModule } from '../user/user.module';
import { RecordRepository } from './repository/record.repository';
import { CreateRecordService } from './services/create-record.service';

@Module({
  imports: [UserModule, CanvaModule],
  controllers: [],
  providers: [CreateRecordService, RecordRepository],
  exports: [CreateRecordService],
})
export class RecordModule {}

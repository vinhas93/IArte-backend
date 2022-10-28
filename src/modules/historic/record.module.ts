import { Module } from '@nestjs/common';
import { CanvaModule } from '../canva/canva.module';
import { UserModule } from '../user/user.module';
import { RecordController } from './record.controller';
import { RecordRepository } from './repository/record.repository';
import { CreateRecordService } from './services/create-record.service';
import { GetAllRecordsService } from './services/get-all-records.service';

@Module({
  imports: [UserModule, CanvaModule],
  controllers: [RecordController],
  providers: [CreateRecordService, RecordRepository, GetAllRecordsService],
  exports: [CreateRecordService],
})
export class RecordModule {}

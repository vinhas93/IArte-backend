import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { CreateRecordDto } from '../dtos/create-record.dto';
import { RecordRepository } from '../repository/record.repository';

@Injectable()
export class CreateRecordService {
  constructor(
    private recordRepository: RecordRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(data: CreateRecordDto) {
    const newRecord = await this.recordRepository.createRecord(data);

    return {
      status: 200,
      data: newRecord,
    };
  }
}

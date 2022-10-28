import { Injectable } from '@nestjs/common';
import { RecordRepository } from '../repository/record.repository';

@Injectable()
export class GetAllRecordsService {
  constructor(private recordRepository: RecordRepository) {}

  async execute() {
    const allRecords = await this.recordRepository.findAllRecords();

    return {
      status: 200,
      data: allRecords,
    };
  }
}

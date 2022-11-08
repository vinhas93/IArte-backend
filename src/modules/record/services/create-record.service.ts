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
    const { userId } = data;

    const userExists = await this.userRepository.findUserById(userId);

    if (!userExists) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    const newRecord = await this.recordRepository.createRecord(data);

    return {
      status: 200,
      data: newRecord,
    };
  }
}

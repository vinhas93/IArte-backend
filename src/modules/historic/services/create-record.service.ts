import { Injectable } from '@nestjs/common';
import { CanvaRepository } from 'src/modules/canva/repository/canva.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { CreateRecordDto } from '../dtos/create-record.dto';
import { RecordRepository } from '../repository/record.repository';

@Injectable()
export class CreateRecordService {
  constructor(
    private recordRepository: RecordRepository,
    private userRepository: UserRepository,
    private canvaRepository: CanvaRepository,
  ) {}

  async execute(data: CreateRecordDto) {
    const { canvaId, userId } = data;

    const userExists = await this.userRepository.findUserById(userId);

    if (!userExists) {
      return {
        status: 400,
        data: { message: 'User not found' },
      };
    }

    const canvaExists = await this.canvaRepository.getCanvaById(canvaId);

    if (!canvaExists) {
      return {
        status: 400,
        data: { message: 'Canva not found' },
      };
    }

    const newRecord = await this.recordRepository.createRecord(data);

    return {
      status: 200,
      data: newRecord,
    };
  }
}

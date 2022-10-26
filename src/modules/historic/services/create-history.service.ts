import { Injectable } from '@nestjs/common';
import { CanvaRepository } from 'src/modules/canva/repository/canva.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { CreateHistoryDto } from '../dtos/create-history.dto';
import { HistoryRepository } from '../repository/history.repository';

@Injectable()
export class CreateHistoryService {
  constructor(
    private historyRepository: HistoryRepository,
    private userRepository: UserRepository,
    private canvaRepository: CanvaRepository,
  ) {}

  async execute(data: CreateHistoryDto) {
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

    const newHistory = await this.historyRepository.createHistory(data);

    return {
      status: 200,
      data: newHistory,
    };
  }
}

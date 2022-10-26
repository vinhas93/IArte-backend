import { Injectable } from '@nestjs/common';
import { HistoryRepository } from './../repository/history.repository';

@Injectable()
export class GetAllHistoryService {
  constructor(private historyRepository: HistoryRepository) {}

  async execute() {
    const allHistory = await this.historyRepository.findAllHistory();

    return {
      status: 200,
      data: allHistory,
    };
  }
}

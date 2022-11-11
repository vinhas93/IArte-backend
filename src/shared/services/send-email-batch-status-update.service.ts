import { Injectable } from '@nestjs/common';
import { MailService } from 'src/modules/mails/mail.service';
import { BatchUpdateStatusRepository } from 'src/modules/upload/repository/batch-update-status.repository';
import { UserRepository } from 'src/modules/user/repository/user.repository';

@Injectable()
export class SendEmailBatchStatusUpdate {
  constructor(
    private batchUpdateStatusRepository: BatchUpdateStatusRepository,
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}
  async execute(batchUpdateStatus, data) {
    const statusBatchUpdate = await this.batchUpdateStatusRepository.update(
      data,
      batchUpdateStatus.id,
    );

    const { successes, failures, totalItensUpdate } = statusBatchUpdate;

    const haveAllCanvasBeenUpdated = successes + failures === totalItensUpdate;

    if (haveAllCanvasBeenUpdated) {
      const user = await this.userRepository.findUserById(
        batchUpdateStatus.userId,
      );
      return await this.mailService.sendStatusBatchUpdate(
        totalItensUpdate,
        successes,
        failures,
        user.email,
        user.name,
      );
    }

    return;
  }
}

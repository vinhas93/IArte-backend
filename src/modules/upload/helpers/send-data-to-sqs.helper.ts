import { Injectable } from '@nestjs/common';

import { UserRepository } from './../../user/repository/user.repository';
import { CanvaRepository } from '../../../modules/canva/repository/canva.repository';
import { MessageProducer } from '../../../shared/sqs/producer/producer.service';
import { BatchUpdateStatusRepository } from '../repository/batch-update-status.repository';

@Injectable()
export class SendDataToSqsHelper {
  constructor(
    private messageProducer: MessageProducer,
    private canvaRepository: CanvaRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(canva, user, batchUpdateStatusId) {
    const userExists = await this.userRepository.findUserById(+user.id);

    if (!userExists) {
      return;
    }

    const canvaExists = await this.canvaRepository.getCanvaById(+canva.id);

    if (!canvaExists) {
      return;
    }

    const newPrice =
      canvaExists.price * ((100 - canva.percentualDesconto) / 100);

    const producerSqsMessage = {
      event: 'updateCanvas',
      data: {
        updateCanva: {
          id: +canva.id,
          price: +newPrice.toFixed(2),
          genre: canvaExists.genre,
        },
        createHistory: {
          oldPrice: +canvaExists.price,
          newPrice: +newPrice.toFixed(2),
          userId: +user.id,
          canvaId: +canva.id,
        },
        batchUpdateStatus: {
          id: batchUpdateStatusId,
        },
      },
    };

    await this.messageProducer.sendMessage(producerSqsMessage);

    return;
  }
}

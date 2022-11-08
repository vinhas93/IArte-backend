import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/modules/category/repository/category.repository';
import { CanvaRepository } from '../../../modules/canva/repository/canva.repository';
import { MessageProducer } from '../../../shared/sqs/producer/producer.service';

@Injectable()
export class SendDataToSqsHelper {
  constructor(
    private messageProducer: MessageProducer,
    private canvaRepository: CanvaRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async execute(canva, user, batchUpdateStatusId) {
    if (isNaN(canva.id)) {
      canva.id = 0;
    }
    const canvaExists = await this.canvaRepository.getCanvaById(+canva.id);
    let newPrice = 0;

    if (canvaExists) {
      const category = await this.categoryRepository.findCategoryByName(
        canvaExists.categoryName,
      );

      newPrice = canvaExists.price * ((100 - canva.percentualDesconto) / 100);

      if (newPrice < category.price) {
        newPrice = category.price;
      }
    }

    const producerSqsMessage = {
      event: 'updateCanvas',
      data: {
        updateCanva: {
          id: +canva.id,
          price: +newPrice.toFixed(2),
          genre: canvaExists ? canvaExists.genre : '',
        },
        createRecord: {
          oldPrice: canvaExists ? +canvaExists.price : 0,
          newPrice: +newPrice.toFixed(2),
          userId: +user.id,
          canvaId: +canva.id,
          atStatus: batchUpdateStatusId,
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

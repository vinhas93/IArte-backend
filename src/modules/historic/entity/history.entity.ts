export class HistoryEntity {
  id?: number;
  oldPrice: number;
  newPrice: number;
  userId: number;
  canvaId: number;
  createdAt?: string | Date;
}

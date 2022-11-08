export class RecordEntity {
  id?: number;
  oldPrice: number;
  newPrice: number;
  userId: number;
  canvaId: number;
  atStatus: number;
  statusMessage?: string;

  createdAt?: string | Date;
}

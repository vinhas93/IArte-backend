export class CreateRecordDto {
  oldPrice: number;
  newPrice: number;
  userId: number;
  canvaId: number | null;
  atStatus: number;
  statusMessage?: string;
}

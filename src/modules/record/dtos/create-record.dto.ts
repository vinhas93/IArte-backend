export class CreateRecordDto {
  oldPrice: number;
  newPrice: number;
  canvaId: number | null;
  atStatus: number;
  statusMessage?: string;
}

import { parse } from 'papaparse';

export class BatchUpdateCanvasService {
  async execute(csvFile) {
    const csvData = csvFile.toString();

    const parsedCsv = parse(csvData, {
      header: true,
      skipEmptyLines: true,
      delimiter: ',',
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    console.log(parsedCsv);

    return 'Teste';
  }
}

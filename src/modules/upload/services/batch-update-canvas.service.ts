import * as Papa from 'papaparse';
import * as Fs from 'fs';

export class BatchUpdateCanvasService {
  async execute(file) {
    const csvFile = await Fs.readFileSync(file.path);
    const csvData = csvFile.toString('utf-8');
    const batchUpdate = await new Promise((resolve) => {
      Papa.parse(csvData, {
        header: true,
        complete: (results) => {
          console.log('Complete ', results.data.length, ' records.');
          resolve(results.data);
        },
      });
    });
    return batchUpdate;
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

import { AxiosProvider } from 'src/shared/providers/axios/axios.provider';
import { ConvertLinkHelper } from '../helpers/convert-link.helper';

@Injectable()
export class UploadImageService {
  constructor(
    private axiosProvider: AxiosProvider,
    private convertLinkHelper: ConvertLinkHelper,
  ) {}

  async execute(file) {
    const formData = new FormData();

    formData.append('filename', file.originalname);
    formData.append('destination', 'images');
    formData.append('create_thumbnail', true);

    const options = {
      headers: {
        Autorization: process.env.CLIENT_ID,
        'content-type': 'multipart/form-data',
      },
    };

    const response = await axios.post(process.env.URL, formData, options);

    const { status, data } = await this.axiosProvider.execute(options);

    if (status != 200) {
      return { status, data };
    }

    const { link } = data.data;

    const base64Link = await this.convertLinkHelper.execute(link);

    return {
      status: 200,
      data: {
        link: base64Link,
      },
    };
  }
}

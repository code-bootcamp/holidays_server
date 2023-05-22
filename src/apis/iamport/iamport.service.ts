import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import axios from 'axios';
import { Response } from 'express';
import {
  IIamportServiceCancel,
  IIamportServiceCheckPaid,
} from './interfaces/iamport-service.interface';

@Injectable()
export class IamPortService {
  async getToken(): Promise<string> {
    try {
      const result = await axios.post(`https://api.iamport.kr/users/getToken`, {
        imp_key: process.env.IMPORT_CLIENT_ID,
        imp_secret: process.env.IMPORT_CLIENT_SECRET,
      });
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({
    imp_uid,
    amount,
  }: IIamportServiceCheckPaid): Promise<void> {
    try {
      console.log(imp_uid, '결제아이디');
      const access_token = await this.getToken();
      const result = await axios.get(
        `https://api.iamport.kr/payments/${imp_uid}`,
        {
          headers: { Authorization: access_token },
        },
      );
      if (amount !== result.data.response.amount)
        throw new UnprocessableEntityException('잘못된 결제 정보입니다.');
    } catch (error) {
      console.log('여기들어오면 위에 통과 못한거임');
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ imp_uid }: IIamportServiceCancel): Promise<number> {
    try {
      const access_token = await this.getToken();
      const result = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        { imp_uid },
        { headers: { Authorization: access_token } },
      );

      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}

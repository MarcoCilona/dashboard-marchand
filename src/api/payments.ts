import { AxiosResponse } from 'axios';
import instance from './index';

const PAYMENTS_RESOURCE = 'payments';

export const PaymentsApi = {
  /**
   * Returning a single payment by a given id
   */
  getPayment(id: string): Promise<AxiosResponse> {
    return instance.get(`/${PAYMENTS_RESOURCE}/${id}`);
  },
  /**
   * Returning the list of payments
   */
  getPayments(): Promise<AxiosResponse> {
    return instance.get(`/${PAYMENTS_RESOURCE}`);
  },
};

import { PaymentsApi } from '../api';

export const retrievePayments = async () => {
  const paymentsResource = await PaymentsApi.getPayments();

  const { data, status, statusText } = paymentsResource;

  if (status === 200) return data;

  return { status, statusText };
};

export const retrievePayment = async (id: string) => {
  const paymentResource = await PaymentsApi.getPayment(id);

  const { data, status, statusText } = paymentResource;

  if (status === 200) return data;

  return { status, statusText };
};

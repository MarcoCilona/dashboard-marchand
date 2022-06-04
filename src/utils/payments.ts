import { PaymentsApi } from '../api';
import { formatNumber, formatWithoutSymbols } from './helpers';

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

/**
 * This function takes an array of payments and formats them to return an array of recaps grouped by status
 * @param payments Array of payments retrieved from Backend
 * @returns An array of Recap containing, for each status, the amount total
 */
export const formatRecaps = (
  payments: Array<DashboardMarchand.Payment>,
): Array<DashboardMarchand.Recap> => {
  const recaps: DashboardMarchand.Recap[] = [];
  const availableStatuses = [...new Set(payments.map(({ status }) => status))];

  for (const _status of availableStatuses) {
    const filteredPaymentsByStatus = payments.filter(({ status }) => status === _status);
    const amount = filteredPaymentsByStatus.reduce((total, payment) => total + payment.amount, 0);

    recaps.push({
      amount: formatNumber(amount),
      status: formatWithoutSymbols(_status),
    });
  }

  return recaps;
};

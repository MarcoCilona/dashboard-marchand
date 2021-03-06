import { PaymentsApi } from '../api';
import { formatNumber, formatWithoutSymbols, removeDuplicates } from './helpers';

/**
 * Utils used to call the api for getting payments and handling its response
 */
export const retrievePayments = async () => {
  const paymentsResource = await PaymentsApi.getPayments();

  const { data, status, statusText } = paymentsResource;

  if (status === 200) return data;

  return { status, statusText };
};

/**
 * Utils that, given an id, calls the api to get that payment info and handles its response
 */
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
  const availableStatuses: string[] = removeDuplicates(payments.map(({ status }) => status));

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

/**
 * Given payments returns labels for chart
 */
export const chartPaymentsLabels = (payments: Array<DashboardMarchand.Payment>): string[] => {
  // Retrieving the created date
  const timestamps = payments.map(({ created }) => created);
  // Sorting them (Jan, Feb, etc...)
  timestamps.sort((a, b) => a - b);

  const labels: string[] = [];

  for (const date of timestamps) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const utcMonth = new Date(date).getUTCMonth();
    const month = months[utcMonth];

    labels.push(month);
  }

  return removeDuplicates(labels) as string[];
};

/**
 * This function will take in input the payments array and will:
 * 1 - sort elements by created timestamp
 * 2 - map created timestamp to isostring month
 *
 * return the formatted paymens
 */
const formatPaymentsCreated = (
  payments: Array<DashboardMarchand.Payment>,
): Array<DashboardMarchand.Payment> => {
  const sortedPaymentsByCreationDate: DashboardMarchand.Payment[] = [...payments].sort(
    (a, b) => a.created - b.created,
  );

  const remapCreatedToMonth: DashboardMarchand.Payment[] = sortedPaymentsByCreationDate.map(
    (payment: DashboardMarchand.Payment) => {
      const dateString = new Date(payment.created).toISOString();
      const splittedDate = dateString.split('-');

      return {
        ...payment,
        created: +splittedDate[1],
      };
    },
  );

  return remapCreatedToMonth;
};

/**
 * Given an array of payments, it will extract the report of a given variable based on months
 * @param payments - Payments to be checked
 * @param param - The payment's info we want to extract the monthly report
 * @returns An array of values representing the report
 */
const extractReport = (payments: Array<DashboardMarchand.Payment>, param: string): number[] => {
  const formattedPaymentsByMonth = formatPaymentsCreated(payments);

  const months = removeDuplicates(formattedPaymentsByMonth.map(({ created }) => created));

  const series: number[] = [];

  for (const month of months) {
    const monthPayments = formattedPaymentsByMonth.filter(({ created }) => created === month);

    series.push(monthPayments.reduce((total, payment) => total + payment[param], 0));
  }

  return series;
};

/**
 * Retrieving amount series for chart
 */
export const chartAmountSeries = (payments: Array<DashboardMarchand.Payment>): number[] => {
  return extractReport(payments, 'amount');
};

/**
 * Retrieving installments series for chart
 */
export const chartInstallmentsSeries = (payments: Array<DashboardMarchand.Payment>): number[] => {
  return extractReport(payments, 'installmentsCount');
};

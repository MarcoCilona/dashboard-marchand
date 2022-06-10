import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PaymentsTable from './PaymentsTable';

const testPayments = [
  {
    status: 'not_started',
    id: 'payment_I4Hnhg',
    created: 1648764000000,
    customer_name: 'Victor Hugo',
    merchant: {
      name: 'Super Merchant',
    },
    amount: 45900,
    installmentsCount: 3,
  },
  {
    status: 'ready',
    id: 'payment_i2NJhL',
    created: 1649023200000,
    customer_name: 'Émile Zola',
    merchant: {
      name: 'Super Merchant',
    },
    amount: 356050,
    installmentsCount: 10,
  },
];

describe('Suite test for PaymentsTable', () => {
  it('Check that, the components renders a table row for each element of the props payments array', () => {
    render(<PaymentsTable payments={testPayments} />);
    const allRows = screen.queryAllByTestId('table-row');

    expect(allRows.length).toBe(testPayments.length);
  });

  it('Check that, clicking on a row, opens the dialog with details', async () => {
    render(<PaymentsTable payments={testPayments} />);
    const allRows = screen.queryAllByTestId('table-row');
    const firstRow = allRows[0];

    fireEvent.click(firstRow);

    const paymentDetailElement = await waitFor(() => screen.findByTestId('payment-detail'));

    expect(paymentDetailElement).toBeInTheDocument();
  });
});

// src/setupTests.js
import { render, screen, waitFor } from '@testing-library/react';
import { server } from '../../mocks/server';
import PaymentDetail from './PaymentDetail';

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe('Testing PaymentDetail component', () => {
  it('Testing api call', async () => {
    render(<PaymentDetail open={true} onClose={jest.fn()} paymentId='payment_i2NJhL' />);

    await waitFor(() => {
      expect(screen.getByTestId('payment-id')).toHaveTextContent('payment_i2NJhL');
      expect(screen.getByTestId('payment-customer')).toHaveTextContent('Émile Zola');
    });
  });
});

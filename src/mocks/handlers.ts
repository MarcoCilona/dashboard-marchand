import { rest } from 'msw';

const paymentTest = {
  status: 'ready',
  id: 'payment_i2NJhL',
  created: 1649023200000,
  customer_name: 'Émile Zola',
  merchant: {
    name: 'Super Merchant',
  },
  amount: 356050,
  installmentsCount: 1,
  paymentPlan: [
    {
      id: 'installment_1',
      due_date: 1649023200000,
      status: 'ready',
      amount: 35555,
      fee: 500,
    },
  ],
};

const paymentListTest = [
  {
    status: 'ready',
    id: 'payment_i2NJhL1',
    created: 1649023200000,
    customer_name: 'Émile Zola',
    merchant: {
      name: 'Super Merchant',
    },
    amount: 356050,
    installmentsCount: 1,
  },
  {
    status: 'ready',
    id: 'payment_i2NJhL2',
    created: 1649023200000,
    customer_name: 'Émile Zola',
    merchant: {
      name: 'Super Merchant',
    },
    amount: 356050,
    installmentsCount: 1,
  },
];

const baseUrl = 'https://cloudrun-frontend-recruitment-test-5hhyjiivra-ew.a.run.app';

export const handlers = [
  // Handles a POST /login request
  rest.get(`${baseUrl}/payments/:paymentId`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.json(paymentTest),
    );
  }),
  rest.get(`${baseUrl}/payments`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.json(paymentListTest),
    );
  }),
];

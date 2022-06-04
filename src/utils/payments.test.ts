// src/api/index.spec.ts
import { AxiosResponse } from 'axios';
import { formatRecaps, retrievePayment, retrievePayments } from './payments';
import instance from '../api/index';
import { formatNumber } from './helpers';

describe('Utils for payments api', () => {
  let mockPost: jest.SpyInstance;

  beforeEach(() => {
    mockPost = jest.spyOn(instance, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Retrieve Payments - Should return a payments list', async () => {
    // Our desired output
    const payments = [
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

    // Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: payments,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    // Make the mock return the custom axios response
    mockPost.mockImplementation(() => Promise.resolve(mockedResponse));

    const data = await retrievePayments();
    expect(data).toEqual(payments);
  });

  test('Retrieve payments - Should return 400 as status code with error', async () => {
    const errorText = 'Erro 400';
    // Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: [],
      status: 400,
      statusText: errorText,
      headers: {},
      config: {},
    };

    // Make the mock return the custom axios response
    mockPost.mockImplementation(() => Promise.resolve(mockedResponse));

    const { status, statusText } = await retrievePayments();
    expect(status).toEqual(400);
    expect(statusText).toEqual(errorText);
  });

  test('Retrieve Single Payment - Should return a payments list', async () => {
    // Our desired output
    const payments = {
      status: 'not_started',
      id: 'payment_I4Hnhg',
      created: 1648764000000,
      customer_name: 'Victor Hugo',
      merchant: {
        name: 'Super Merchant',
      },
      amount: 45900,
      installmentsCount: 3,
    };
    // Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: payments,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };

    // Make the mock return the custom axios response
    mockPost.mockImplementation(() => Promise.resolve(mockedResponse));

    const data = await retrievePayment('payment_I4Hnhg');
    expect(data).toEqual(payments);
  });

  test('Retrieve single payment - Should return 500 as status code with error', async () => {
    const errorText = 'Internal server error';
    // Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: [],
      status: 500,
      statusText: errorText,
      headers: {},
      config: {},
    };

    // Make the mock return the custom axios response
    mockPost.mockImplementation(() => Promise.resolve(mockedResponse));

    const { status, statusText } = await retrievePayment('');
    expect(status).toEqual(500);
    expect(statusText).toEqual(errorText);
  });

  test('Retrieve payments reaps - Given an array of payments it returns an array of recaps', () => {
    const payments = [
      {
        status: 'not_started',
        id: 'payment_I4Hnhg',
        created: 1648764000000,
        customer_name: 'Victor Hugo',
        merchant: {
          name: 'Super Merchant',
        },
        amount: 400,
        installmentsCount: 3,
      },
      {
        status: 'not_started',
        id: 'payment_I4Hnhg',
        created: 1648764000000,
        customer_name: 'Victor Hugo',
        merchant: {
          name: 'Super Merchant',
        },
        amount: 500,
        installmentsCount: 3,
      },
      {
        status: 'ready',
        id: 'payment_I4Hnhg',
        created: 1648764000000,
        customer_name: 'Victor Hugo',
        merchant: {
          name: 'Super Merchant',
        },
        amount: 1000,
        installmentsCount: 3,
      },
      {
        status: 'ready',
        id: 'payment_I4Hnhg',
        created: 1648764000000,
        customer_name: 'Victor Hugo',
        merchant: {
          name: 'Super Merchant',
        },
        amount: 200,
        installmentsCount: 3,
      },
      {
        status: 'ready',
        id: 'payment_I4Hnhg',
        created: 1648764000000,
        customer_name: 'Victor Hugo',
        merchant: {
          name: 'Super Merchant',
        },
        amount: 500,
        installmentsCount: 3,
      },
    ];

    const recaps = formatRecaps(payments);

    // Expecting to see an array of two recaps
    expect(recaps.length).toBe(2);

    const readyAmount = recaps.find(({ status }) => status === 'ready');
    expect(readyAmount.amount).toBe(formatNumber(1700));

    const notStartedAmount = recaps.find(({ status }) => status === 'not started');
    expect(notStartedAmount.amount).toBe(formatNumber(900));
  });
});

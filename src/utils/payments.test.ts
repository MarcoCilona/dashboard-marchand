// src/api/index.spec.ts
import { AxiosResponse } from 'axios';
import { retrievePayment, retrievePayments } from './payments';
import instance from '../api/index';

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
});

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cloudrun-frontend-recruitment-test-5hhyjiivra-ew.a.run.app/',
});

// Intercepting very response and formatting it for FE
instance.interceptors.response.use(
  (response) => {
    const formattedResponse = {
      ...response.data,
    };
    return formattedResponse;
  },
  (error) => {
    const { data = {}, status = {} } = error.response;
    const { errors = [] } = data;

    return { errors, statusCode: status };
  },
);

export default instance;

export { PaymentsApi } from './payments';

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cloudrun-frontend-recruitment-test-5hhyjiivra-ew.a.run.app/',
});

export default instance;

export { PaymentsApi } from './payments';

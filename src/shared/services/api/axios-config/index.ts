import { errorInterceptor, responseInterceptor } from './interceptors';
import axios from 'axios';

const Api = axios.create({
  baseURL: 'http://localhost:3333',
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };

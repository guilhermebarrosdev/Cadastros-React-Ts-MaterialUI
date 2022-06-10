import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';
import { environment } from '../../../environments';

const Api = axios.create({
  baseURL: environment.URL_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('APP_ACCESS_TOKEN') || ''}`,
  },
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };

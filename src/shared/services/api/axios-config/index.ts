import axios from 'axios';

import { errorInterceptor, responseInterceptor } from './interceptors';
import { environment } from '../../../environments';

const Api = axios.create({
  baseURL: environment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error)
);

export { Api };

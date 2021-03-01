
import axios from 'axios';
import queryString from 'query-string';

import { config } from '../constants';
import { AdvancedError } from '../helpers';

const axiosClient = axios.create({
  baseURL: config.API_URL,
  timeout: 20000,
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async config => {
  config.headers['Content-Type'] = 'application/json';
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, error => {
  if (error.response) {
    throw new AdvancedError({ message: error.response.data.message, statusCode: error.response.status });
  } else {
    throw new AdvancedError({ message: error.message, statusCode: 500 });
  }
});

export default axiosClient;
import axios, { AxiosInstance } from 'axios';
import { ApiUrl } from './baseUrl';

const api: AxiosInstance = axios.create({
  baseURL: ApiUrl,
});

export default api;

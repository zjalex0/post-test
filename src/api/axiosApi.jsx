import axios from 'axios';
import qs from 'qs';

const axiosApi = axios.create({
  baseURL: `https://dummyapi.io/data/v1/`
});

// Todo: configurar interceptores
axiosApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'app-id': '62dcae93e7f8f74b14084f78'
  };
  config.data = qs.stringify(config.data);
  return config;
});

export { axiosApi };

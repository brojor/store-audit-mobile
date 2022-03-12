import axios from 'axios';

const baseURL = 'https://store-audit.herokuapp.com/';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

if (window.Cypress) {
  window.$axiosInstance = axiosInstance;
}

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && window.location.hash !== '#/login') {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

const getListOfStores = () => axiosInstance.get('/stores');
const fetchSeed = () => axiosInstance.get('/category-names');
const sendResults = (payload) => axiosInstance.post('/results', payload);
const login = (credentials) => axiosInstance.post('/auth/login', credentials);

export default {
  axiosInstance,
  getListOfStores,
  fetchSeed,
  sendResults,
  login,
};

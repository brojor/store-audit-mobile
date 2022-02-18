import axios from 'axios';
// prettier-ignore
const baseURL = process.env.NODE_ENV === 'development'
  ? process.env.VUE_APP_LOCAL_URL
  : 'https://store-audit.herokuapp.com';

console.log({ baseURL });

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('token');
//       window.location.reload();
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
// export const getListOfStores = () => axiosInstance.get('/stores');
export const getListOfStores = () => axiosInstance.get('/stores');

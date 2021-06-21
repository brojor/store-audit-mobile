import axios from 'axios';

export default () => {
  const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  //   }

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        // localStorage.removeItem('user');
        window.location.reload();
      }
      return Promise.reject(error);
    },
  );
  console.log({ axiosInstance });
  return axiosInstance;
};

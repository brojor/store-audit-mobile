import axios from 'axios';

const baseURL = process.env.VUE_APP_API_URL;

const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  //   getRecipes(token) {
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     return apiClient.get('/recipes', { headers });
  //   },
  login(credentials) {
    console.log('apiservice login');
    return apiClient.post('/auth/login', credentials);
  },
};

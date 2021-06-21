import Api from '@/services/Api';

export default {
  login(credentials) {
    console.log('apiservice login');
    console.log({ Api });
    return Api().post('/auth/login', credentials);
  },
};

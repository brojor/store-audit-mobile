import Api from '@/services/Api';

export default {
  sendResults(payload) {
    return Api.post('/results', payload);
  },
};

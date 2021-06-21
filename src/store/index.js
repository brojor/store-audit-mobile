import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      Api().defaults.headers.common.Authorization = `Bearer ${token}`;
    },
  },
  actions: {
    login({ commit }, credentials) {
      return AuthService.login(credentials)
        .then(({ data }) => {
          console.log('actions-token', data.token);
          commit('SET_TOKEN', data.token);
        })
        .catch((err) => {
          console.log('error: ', err);
        });
    },
  },
  modules: {},
});

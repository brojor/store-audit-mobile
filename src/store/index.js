import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    stores: JSON.parse(localStorage.getItem('stores')) || [],
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
      Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    SET_STORES(state, stores) {
      state.stores = stores;
      localStorage.setItem('stores', JSON.stringify(stores));
    },
  },
  actions: {
    login({ commit, dispatch }, credentials) {
      return AuthService.login(credentials)
        .then(({ data }) => {
          console.log('actions-token', data.token);
          commit('SET_TOKEN', data.token);
          dispatch('getStores');
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    getStores({ commit }) {
      return Api.get('/stores')
        .then(({ data }) => {
          commit('SET_STORES', data.stores);
        })
        .catch((err) => console.log(err));
    },
  },
  modules: {},
  getters: {
    userIsLogged: (state) => {
      if (state.token) {
        return true;
      }
      return false;
    },
  },
});

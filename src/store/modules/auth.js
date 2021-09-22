/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

const state = {
  token: localStorage.getItem('token') || null,
  stores: JSON.parse(localStorage.getItem('stores')) || [],
};
const getters = {
  userIsLogged: (state) => {
    if (state.token) {
      return true;
    }
    return false;
  },
};
const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  SET_STORES(state, stores) {
    state.stores = stores;
    localStorage.setItem('stores', JSON.stringify(stores));
  },
};
const actions = {
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
  logout({ commit }) {
    commit('SET_TOKEN', null);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

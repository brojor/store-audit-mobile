/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

const state = {
  token: localStorage.getItem('token') || null,
  stores: JSON.parse(localStorage.getItem('stores')) || [],
};
const getters = {
  isAuthenticated: (state) => {
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
};
const actions = {
  login({ commit, dispatch }, credentials) {
    return AuthService.login(credentials)
      .then(({ data }) => {
        commit('SET_TOKEN', data.token);
        dispatch('getStores');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },
  logout({ commit }) {
    console.log('odhlašuji');
    commit('SET_TOKEN', '');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

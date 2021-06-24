import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

import categories from '@/skeleton.json';
import results from '@/results.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    stores: JSON.parse(localStorage.getItem('stores')) || [],
    categories,
    results,
    modal: { isOpen: false },
    commentedPoint: { categoryId: null, categoryPointId: null },
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
    WRITE_STATUS(state, { accepted, categoryId, categoryPointId }) {
      const { categoryPoints } = state.categories.find((category) => category.id === categoryId);
      const currentcategoryPoint = categoryPoints.find(
        (categoryPoint) => categoryPoint.id === categoryPointId,
      );
      currentcategoryPoint.accepted = accepted;
    },
    WRITE_COMMENT(state, comment) {
      const { categoryId, categoryPointId } = state.commentedPoint;
      const { categoryPoints } = state.categories.find((category) => category.id === categoryId);
      const currentcategoryPoint = categoryPoints.find(
        (categoryPoint) => categoryPoint.id === categoryPointId,
      );
      currentcategoryPoint.comment = comment;
    },
    OPEN_MODAL(state) {
      state.modal.isOpen = true;
    },
    CLOSE_MODAL(state) {
      state.modal.isOpen = false;
    },
    SET_COMMENTED_POINT_IDS(state, { categoryId, categoryPointId }) {
      state.commentedPoint = { categoryId, categoryPointId };
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
    addComment({ commit }, { categoryId, categoryPointId }) {
      commit('OPEN_MODAL');
      commit('SET_COMMENTED_POINT_IDS', { categoryId, categoryPointId });
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
    categoryPointIsAccepted: (state) => (categoryId, categoryPointId) => {
      const { categoryPoints } = state.categories.find((category) => category.id === categoryId);
      const { accepted } = categoryPoints.find(
        (categoryPoint) => categoryPoint.id === categoryPointId,
      );
      return accepted;
    },
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

import categories from '@/skeleton.json';
import results from '@/results.json';

Vue.use(Vuex);

function isAccepted({ state, categoryId, categoryPointId }) {
  const { categoryPoints } = state.categories.find((category) => category.id === categoryId);
  const { accepted } = categoryPoints.find((categoryPoint) => categoryPoint.id === categoryPointId);
  return accepted;
}

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    stores: JSON.parse(localStorage.getItem('stores')) || [],
    categories,
    results,
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
    writeStatus({ state, commit }, { swipeDirection, categoryId, categoryPointId }) {
      const accepted = isAccepted({ state, categoryId, categoryPointId });
      if (swipeDirection === 'right' && !accepted) {
        console.log('comituju accepted = TRUE');
        commit('WRITE_STATUS', { accepted: true, categoryId, categoryPointId });
      }
      if (swipeDirection === 'left' && accepted) {
        // spustVyskakovacíOkno().then(() => {
        //   commit('WRITE_STATUS', { accepted: false, categoryId, categoryPointId });
        // });
        console.log('comituju accepted = FALSE');
        commit('WRITE_STATUS', { accepted: false, categoryId, categoryPointId });
      }

      // if (state.results[categoryId][categoryPointId].accepted !== true) {
      //   commit('WRITE_STATUS', { accepted: true, categoryId, categoryPointId });
      // }

      // // if not accepted
      // console.log('vuex - accepted', categoryId, categoryPointId);
      // console.log('vuex ', state);
      // console.log(commit);
    },
    rejectPoint({ commit, state }, { categoryId, categoryPointId }) {
      if (state.categories[categoryId][categoryPointId].accepted !== false) {
        commit('WRITE_STATUS', { accepted: false, categoryId, categoryPointId });
      }
      // this.writeStatus(categoryId, categoryPointId, false);
      // // samostatná metoda?
      // this.justEdited = { categoryId, categoryPointId };
      // if not rejected
      console.log('vuex - reject', categoryId, categoryPointId);
      console.log(commit);
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

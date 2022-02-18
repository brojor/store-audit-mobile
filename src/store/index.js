import Vue from 'vue';
import Vuex from 'vuex';

import Api from '../services/Api';

import auth from './modules/auth';
import modal from './modules/modal';
import stores from './modules/stores';

const buildEmptyResults = (seed) => {
  const listOfIds = seed.map(({ categoryPoints }) => categoryPoints.map(({ id }) => id)).flat();
  return listOfIds.reduce((obj, id) => ({ ...obj, [id]: { accepted: null } }), {});
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: JSON.parse(localStorage.getItem('seed')) || [],
    results: {},
  },
  mutations: {
    SET_CATEGORY_NAMES(state, seed) {
      state.categories = seed;
      localStorage.setItem('seed', JSON.stringify(seed));
    },
    SET_RESULTS(state) {
      const { selectedStoreId } = state.stores;
      const emptyResults = buildEmptyResults(state.categories);
      const savedResults = JSON.parse(localStorage.getItem(selectedStoreId)) || {};
      state.results = { ...emptyResults, ...savedResults };
    },
    WRITE_STATUS(state, { accepted, categoryPointId, comment }) {
      state.results[categoryPointId] = { accepted, comment };
      const localStorageEntry = JSON.parse(localStorage.getItem(state.selectedStoreId)) || {};
      localStorageEntry[categoryPointId] = { accepted, comment };
      localStorage.setItem(state.stores.selectedStoreId, JSON.stringify(localStorageEntry));
    },
    RESET_RESULTS(state) {
      state.results = { ...state.emptyResults };
      localStorage.setItem(state.selectedStoreId, JSON.stringify({}));
    },
  },
  actions: {
    getSeed({ commit }) {
      return Api.get('/category-names').then(({ data: seed }) => {
        commit('SET_CATEGORY_NAMES', seed);
        commit('SET_RESULTS');
      });
    },
  },
  getters: {
    availableScore(state) {
      return (categoryId) => {
        if (!categoryId) {
          return state.categories
            .map(({ categoryPoints }) => categoryPoints.map(({ weight }) => weight))
            .flat()
            .reduce((acc, weight) => acc + weight, 0);
        }
        return state.categories
          .find(({ id }) => id === categoryId)
          .categoryPoints.map(({ weight }) => weight)
          .reduce((acc, weight) => acc + weight, 0);
      };
    },
    achievedScore(state) {
      return (categoryId) => {
        let categoryPoints;

        if (categoryId) {
          ({ categoryPoints } = state.categories.find(({ id }) => id === categoryId));
        } else {
          categoryPoints = state.categories.reduce(
            (arr, category) => [...arr, ...category.categoryPoints],
            [],
          );
        }

        const score = categoryPoints.reduce(
          (acc, point) => (state.results[point.id].accepted ? acc + point.weight : acc),
          0,
        );
        return score;
      };
    },
    score(state, getters) {
      return (categoryId) => {
        if (Object.keys(state.results).length) {
          const available = getters.availableScore(categoryId);
          const achieved = getters.achievedScore(categoryId);
          const perc = (achieved / available) * 100;
          return { available, achieved, perc };
        }
        return { perc: 0 };
      };
    },
    listOfUnfilledItems(state) {
      return state.categories.reduce((arr, category) => {
        let counter = 0;
        category.categoryPoints.forEach(({ id }) => {
          if (state.results[id].accepted === null) {
            counter += 1;
          }
        });
        return [...arr, { name: category.name, count: counter, id: category.id }];
      }, []);
    },
  },
  modules: { auth, modal, stores },
});

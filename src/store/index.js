import Vue from 'vue';
import Vuex from 'vuex';

import Api from '../services/Api';
import WriteComment from '../components/modal/WriteComment.vue';
import UnfilledPoints from '../components/modal/UnfilledPoints.vue';
import auth from './modules/auth';

const buildEmptyResults = (seed) => {
  const listOfIds = seed.map(({ categoryPoints }) => categoryPoints.map(({ id }) => id)).flat();
  return listOfIds.reduce((obj, id) => ({ ...obj, [id]: { accepted: null } }), {});
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: JSON.parse(localStorage.getItem('seed')) || [],
    results: {},
    modal: { isOpen: false, title: '', message: '' },
    commentedPoint: { categoryId: null, categoryPointId: null },
    activeCategory: null,
    stores: [],
    selectedStoreId: localStorage.getItem('selectedStoreId') || '',
  },
  mutations: {
    SET_CATEGORY_NAMES(state, seed) {
      state.categories = seed;
      localStorage.setItem('seed', JSON.stringify(seed));
    },
    SET_RESULTS(state) {
      const emptyResults = buildEmptyResults(state.categories);
      const savedResults = JSON.parse(localStorage.getItem(state.selectedStoreId)) || {};
      state.results = { ...emptyResults, ...savedResults };
    },
    WRITE_STATUS(state, { accepted, categoryPointId, comment }) {
      state.results[categoryPointId] = { accepted, comment };
      const localStorageEntry = JSON.parse(localStorage.getItem(state.selectedStoreId)) || {};
      localStorageEntry[categoryPointId] = { accepted, comment };
      localStorage.setItem(state.selectedStoreId, JSON.stringify(localStorageEntry));
    },
    OPEN_MODAL(state, { title, component, message = '' }) {
      state.modal.isOpen = true;
      state.modal.title = title;
      state.modal.message = message;
      state.modal.component = component;
    },
    CLOSE_MODAL(state) {
      state.modal.isOpen = false;
    },
    SET_UNFILLED_POINTS(state, unfilledPoints) {
      state.unfilledPoints = unfilledPoints;
    },
    SET_ACTIVE_CATEGORY(state, categoryId) {
      state.activeCategory = categoryId;
    },
    RESET_RESULTS(state) {
      state.results = { ...state.emptyResults };
      localStorage.setItem(state.selectedStoreId, JSON.stringify({}));
    },
    SET_STORES(state, stores) {
      state.stores = stores;
    },
    SET_SELECTED_STORE(state, id) {
      state.selectedStoreId = id;
      localStorage.setItem('selectedStoreId', id);
    },
    SET_PROMISE(state, promise) {
      state.promise = promise;
    },
  },
  actions: {
    getSeed({ commit }) {
      return Api.get('/category-names').then(({ data: seed }) => {
        commit('SET_CATEGORY_NAMES', seed);
        commit('SET_RESULTS');
      });
    },
    changeStoreId({ commit }, id) {
      commit('SET_SELECTED_STORE', id);
      commit('SET_RESULTS');
    },
    addComment({ commit }) {
      return new Promise((resolve) => {
        commit('OPEN_MODAL', {
          title: 'Přidání poznámky',
          component: WriteComment,
        });
        commit('SET_PROMISE', resolve);
      });
    },
    showUnfilledPointsWarning({ commit }, unfilledPoints) {
      commit('OPEN_MODAL', { title: 'Nedokončená hodnocení: ', component: UnfilledPoints });
      commit('SET_UNFILLED_POINTS', unfilledPoints);
    },
    getStores({ commit, state }) {
      return Api.get('/stores')
        .then(({ data }) => {
          commit('SET_STORES', data.stores);
          const id = state.selectedStoreId || data.stores[0].id;
          this.dispatch('changeStoreId', id);
        })
        .catch((err) => console.log(err));
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
  modules: { auth },
});

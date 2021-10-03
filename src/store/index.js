import Vue from 'vue';
import Vuex from 'vuex';

import categories from '@/skeleton.json';

import UnfilledPoints from '@/components/modal/UnfilledPoints.vue';
import WriteComment from '@/components/modal/WriteComment.vue';

import Api from '@/services/Api';
import { addZeroIfLowerTen } from '../utils';
import auth from './modules/auth';
import emptyResults from '../empty.json';
import seed from '../seed.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories,
    results: {},
    modal: { isOpen: false, title: '', message: '' },
    commentedPoint: { categoryId: null, categoryPointId: null },
    activeCategory: null,
    stores: [],
    selectedStoreId: '',
  },
  mutations: {
    WRITE_STATUS(state, { accepted, categoryPointId, comment }) {
      state.results[categoryPointId] = { accepted, comment };
      // const { categoryPoints } = state.categories.find((category) => category.id === categoryId);
      // const currentcategoryPoint = categoryPoints.find(
      //   (categoryPoint) => categoryPoint.id === categoryPointId,
      // );
      // currentcategoryPoint.accepted = accepted;
      // const categoryNum = addZeroIfLowerTen(categoryId);
      // const categoryPointNum = addZeroIfLowerTen(categoryPointId);
      const localStorageEntry = JSON.parse(localStorage.getItem(state.selectedStoreId)) || {};
      localStorageEntry[categoryPointId] = { accepted, comment };
      localStorage.setItem(state.selectedStoreId, JSON.stringify(localStorageEntry));

      // console.log({
      //   [state.selectedStoreId]: { [`C${categoryNum}P${categoryPointNum}`]: accepted },
      // });
    },
    WRITE_COMMENT(state, comment) {
      const { categoryId, categoryPointId } = state.commentedPoint;
      const { categoryPoints } = state.categories.find((category) => category.id === categoryId);
      const currentcategoryPoint = categoryPoints.find(
        (categoryPoint) => categoryPoint.id === categoryPointId,
      );
      currentcategoryPoint.comment = comment;
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
    SET_COMMENTED_POINT_IDS(state, { categoryId, categoryPointId }) {
      state.commentedPoint = { categoryId, categoryPointId };
    },
    SET_UNFILLED_POINTS(state, unfilledPoints) {
      console.log('hello from mutation', { unfilledPoints });
      state.unfilledPoints = unfilledPoints;
    },
    SET_ACTIVE_CATEGORY(state, categoryId) {
      state.activeCategory = categoryId;
    },
    RESET_RESULTS(state) {
      console.log('resetuji..');
      state.categories = state.categories.map((category) => {
        const categoryPoints = category.categoryPoints.map((categoryPoint) => ({
          ...categoryPoint,
          accepted: null,
          comment: null,
        }));
        return { ...category, categoryPoints };
      });
    },
    SET_STORES(state, stores) {
      state.stores = stores;
    },
    SET_SELECTED_STORE(state, id) {
      state.selectedStoreId = id;
    },
    SET_RESULTS(state, resultsToSet) {
      state.results = resultsToSet;
    },
    SET_PROMISE(state, promise) {
      state.promise = promise;
    },
  },
  actions: {
    changeStoreId({ commit }, id) {
      const auditInProgress = JSON.parse(localStorage.getItem(id)) || {};
      const results = { ...emptyResults, ...auditInProgress };
      commit('SET_RESULTS', results);
      commit('SET_SELECTED_STORE', id);

      // console.log({ audit });
    },
    addComment({ commit }) {
      return new Promise((resolve) => {
        commit('OPEN_MODAL', {
          title: 'Přidání poznámky',
          component: WriteComment,
        });
        // commit('SET_COMMENTED_POINT_IDS', categoryPointId);
        commit('SET_PROMISE', resolve);
      });
    },
    showUnfilledPointsWarning({ commit }, unfilledPoints) {
      console.log('hello from actions', { unfilledPoints });

      commit('OPEN_MODAL', { title: 'Chybí vyplnit následující body', component: UnfilledPoints });
      commit('SET_UNFILLED_POINTS', unfilledPoints);
    },
    getStores({ commit }) {
      return Api.get('/stores')
        .then(({ data }) => {
          commit('SET_STORES', data.stores);
          const { id } = data.stores[0];
          commit('SET_SELECTED_STORE', id);
          this.dispatch('changeStoreId', id);
        })
        .catch((err) => console.log(err));
    },
  },

  getters: {
    results2d(state) {
      return Object.entries(state.results).reduce((res, [id, val]) => {
        const categoryId = Number(id.slice(1, 3));
        const categoryPointId = Number(id.slice(4));
        const categoryName = seed.names.categories[categoryId];
        const categoryPointName = seed.names.categoryPoints[id];
        const categoryPointWeight = seed.weights[id];
        const value = {
          ...val,
          id: categoryPointId,
          name: categoryPointName,
          weight: categoryPointWeight,
          newId: id,
        };
        if (!res[categoryId - 1]) {
          // eslint-disable-next-line no-param-reassign
          res[categoryId - 1] = {
            id: categoryId,
            categoryPoints: [value],
            name: categoryName,
          };
        } else {
          res[categoryId - 1].categoryPoints.push(value);
        }
        return res;
      }, []);
    },
    categoryPointIsAccepted: (state) => (categoryId, categoryPointId) => {
      const { categoryPoints } = state.categories.find((category) => category.id === categoryId);
      const { accepted } = categoryPoints.find(
        (categoryPoint) => categoryPoint.id === categoryPointId,
      );
      return accepted;
    },
    results(state) {
      return state.categories
        .map(
          (category) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            category.categoryPoints.map((catPoint) => {
              const { comment, accepted, id } = catPoint;
              const categoryNum = addZeroIfLowerTen(category.id);
              const categoryPointNum = addZeroIfLowerTen(id);
              const categoryPoint = `C${categoryNum}P${categoryPointNum}`;
              return {
                comment,
                accepted,
                categoryPoint,
                category: category.id,
              };
            }),
          // eslint-disable-next-line function-paren-newline
        )
        .flat();
    },
    listOfUnfilledItems(state) {
      return state.categories.reduce((arr, category) => {
        const { name } = category;
        const unfilledPoints = category.categoryPoints
          .filter((categoryPoint) => categoryPoint.accepted === null)
          .map((categoryPoint) => categoryPoint.name);
        if (unfilledPoints.length) {
          arr.push({ name, unfilledPoints });
        }
        return arr;
      }, []);
    },
  },
  modules: { auth },
});

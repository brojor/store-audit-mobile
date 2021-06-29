import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '@/services/AuthService';
import Api from '@/services/Api';

import categories from '@/skeleton.json';

import UnfilledPoints from '@/components/modal/UnfilledPoints.vue';
import WriteComment from '@/components/modal/WriteComment.vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    stores: JSON.parse(localStorage.getItem('stores')) || [],
    categories,
    modal: { isOpen: false, title: '', message: '' },
    commentedPoint: { categoryId: null, categoryPointId: null },
    unfilledPoints: [],
    activeCategory: null,
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
      commit('OPEN_MODAL', { title: 'Přidání poznámky', component: WriteComment });
      commit('SET_COMMENTED_POINT_IDS', { categoryId, categoryPointId });
    },
    showUnfilledPointsWarning({ commit }, unfilledPoints) {
      console.log('hello from actions', { unfilledPoints });

      commit('OPEN_MODAL', { title: 'Chybí vyplnit následující body', component: UnfilledPoints });
      commit('SET_UNFILLED_POINTS', unfilledPoints);
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
    // prettier-ignore
    results(state) {
      return state.categories
        .map((category) => category.categoryPoints.map((catPoint) => {
          const { comment, accepted, id: categoryPoint } = catPoint;
          return {
            comment,
            accepted,
            categoryPoint,
            category: category.id,
          };
        })).flat();
    },
    unfilledPoints(state) {
      return state.categories.reduce((acc, category) => {
        const unfilledPoints = category.categoryPoints
          .filter((categoryPoint) => categoryPoint.accepted === null)
          .map((categoryPoint) => categoryPoint.name);
        const categoryName = category.name;
        if (unfilledPoints.length) {
          acc.push({ categoryName, unfilledPoints });
        }
        return acc;
      }, []);
    },
  },
});

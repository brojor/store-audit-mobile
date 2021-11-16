import Vue from 'vue';
import Vuex from 'vuex';

import categories from '@/skeleton.json';

import UnfilledPoints from '@/components/modal/UnfilledPoints.vue';
import WriteComment from '@/components/modal/WriteComment.vue';

import Api from '@/services/Api';
import auth from './modules/auth';
import emptyResults from '../empty.json';
import seed from '../seed.json';

function calcAvailableScore(weights, categoryId) {
  if (!categoryId) {
    return Object.values(seed.weights).reduce((acc, weight) => acc + weight, 0);
  }
  return Object.entries(weights).reduce((sum, [id, weight]) => {
    if (Number(id.slice(1, 3)) === categoryId) {
      return sum + weight;
    }
    return sum;
  }, 0);
}

function calcScore(categoryPoints) {
  return categoryPoints.reduce((score, categoryPoint) => {
    if (categoryPoint.accepted) {
      return score + categoryPoint.weight;
    }
    return score;
  }, 0);
}

function calcAchievedScore(results, categoryId) {
  let categoryPoints;
  if (categoryId) {
    categoryPoints = results.find((category) => category.id === categoryId).categoryPoints;
  } else {
    categoryPoints = results
      .reduce((arr, category) => {
        arr.push(category.categoryPoints);
        return arr;
      }, [])
      .flat();
  }
  return calcScore(categoryPoints);
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories,
    results: { ...emptyResults },
    modal: { isOpen: false, title: '', message: '' },
    commentedPoint: { categoryId: null, categoryPointId: null },
    activeCategory: null,
    stores: [],
    selectedStoreId: '',
    seed,
  },
  mutations: {
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
      state.results = { ...emptyResults };
      localStorage.setItem(state.selectedStoreId, JSON.stringify({}));
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
    listOfUnfilledItems(state, getters) {
      return getters.results2d.reduce((arr, category) => {
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
    achievedScoreInCategory(state, getters) {
      return (categoryId) => {
        const availableScore = calcAvailableScore(seed.weights, categoryId);
        const achievedScore = calcAchievedScore(getters.results2d, categoryId);
        return (achievedScore / availableScore) * 100;
      };
    },
    totalScore(_, getters) {
      const available = calcAvailableScore(seed.weights);
      const achieved = calcAchievedScore(getters.results2d);
      const perc = (achieved / available) * 100;
      return { available, achieved, perc };
    },
  },
  modules: { auth },
});

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import Api from '../../services/Api';

const state = {
  listOfStores: [],
  selectedStoreId: localStorage.getItem('selectedStoreId') || '',
};
const mutations = {
  SET_STORES(state, stores) {
    state.listOfStores = stores;
  },
  SET_SELECTED_STORE(state, id) {
    state.selectedStoreId = id;
    localStorage.setItem('selectedStoreId', id);
  },
};
const actions = {
  changeStoreId({ commit }, id) {
    commit('SET_SELECTED_STORE', id);
    commit('SET_RESULTS');
  },
  getStores({ commit }) {
    Api.getListOfStores()
      .then(({ data }) => {
        commit('SET_STORES', data.stores);
        const [firstStore] = data.stores;
        this.dispatch('changeStoreId', firstStore.id);
      })
      .catch((err) => console.log(err));
  },
};

export default {
  state,
  mutations,
  actions,
};

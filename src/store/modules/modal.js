/* eslint no-shadow: ["error", { "allow": ["state"] }] */
import WriteComment from '../../components/modal/WriteComment.vue';
import UnfilledPoints from '../../components/modal/UnfilledPoints.vue';
import Warning from '../../components/modal/Warning.vue';

const components = {
  WriteComment,
  UnfilledPoints,
  Warning,
};

const state = {
  isOpen: false, title: '', message: '', component: {},
};

const mutations = {
  OPEN_MODAL(state, {
    title, component, resolver = null, message,
  }) {
    state.isOpen = true;
    state.title = title;
    state.message = message;
    state.component = components[component];
    state.addProblemDescription = resolver;
  },
  CLOSE_MODAL(state) {
    state.isOpen = false;
  },
};

const actions = {
  showUnfilledPointsWarning({ commit }) {
    commit('OPEN_MODAL', { title: 'Nedokončená hodnocení: ', component: 'UnfilledPoints' });
  },
  addProblemDescription({ commit }) {
    return new Promise((resolve) => setTimeout(() => {
      commit('OPEN_MODAL', {
        title: 'Přidání poznámky',
        component: 'WriteComment',
        resolver: resolve,
      });
    }, 350));
  },
};

export default {
  state,
  mutations,
  actions,
};

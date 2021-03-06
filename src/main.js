import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

const app = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

if (window.Cypress) {
  window.$vueApp = app;
}

import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import CategoryView from '../views/CategoryView.vue';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const { isAuthenticated } = store.getters;
      if (!isAuthenticated) {
        next({ name: 'Login' });
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/mobile-only',
    name: 'MobileOnly',
    component: () => import(/* webpackChunkName: "mobileOnly" */ '../views/MobileOnly.vue'),
  },
  {
    path: '/category/:id',
    name: 'categoryView',
    component: CategoryView,
  },

];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isMobile = window.innerWidth <= 767;
  if (to.name !== 'MobileOnly' && !isMobile) {
    next({ name: 'MobileOnly' });
  } else {
    next();
  }
});

export default router;

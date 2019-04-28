import Vue from 'vue';
import store from '@/store';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./layouts/MainLayout.vue'),
      children: [{
        path: '',
        name: 'home',
        component: () => import('./views/Home.vue'),
      },
      {
        path: 'gameList',
        name: 'gameList',
        component: () => import('./views/GameList.vue'),
        beforeEnter: (to, from, next) => {
          if (!store.getters.isConnect) {
            next({ name: 'home' });
          } else {
            next();
          }
        }
      }],
    },
    {
      path: '/',
      component: () => import('./layouts/CenteredLayout.vue'),
      beforeEnter: (to, from, next) => {
        if (store.getters.isConnect) {
          next({ name: 'home' });
        } else {
          next();
        }
      },
      children: [{
        path: '/signIn',
        name: 'signIn',
        component: () => import('./components/SignIn.vue'),
      },
      {
        path: '/signUp',
        name: 'signUp',
        component: () => import('./components/SignUp.vue'),
      },
      {
        path: '/confirmPasswordReset',
        name: 'confirmPasswordReset',
        component: () => import('./components/ConfirmPasswordReset.vue'),
      },
      {
        path: '/sendPasswordResetEmail',
        name: 'sendPasswordResetEmail',
        component: () => import('./components/SendPasswordResetEmail.vue'),
      }],
    },
    {
      path: '/applyActionCode',
      name: 'applyActionCode',
      component: () => import('./views/ApplyActionCode.vue'),
    },
  ],
});

export default router;

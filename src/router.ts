import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./layouts/MainLayout.vue'),
    },
    {
      path: '/',
      component: () => import('./layouts/CenteredLayout.vue'),
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

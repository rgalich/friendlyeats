import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/passwordReset',
      name: 'passwordReset',
      component: () => import('./views/PasswordReset.vue'),
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('./views/SignIn.vue'),
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: () => import('./views/SignUp.vue'),
    },
    {
      path: '/expiredLink',
      name: 'expiredLink',
      component: () => import('./views/ExpiredLink.vue'),
    },
    {
      path: '/applyActionCode',
      name: 'applyActionCode',
      component: () => import('./views/ApplyActionCode.vue'),
    },
    {
      path: '/verifyEmail',
      name: 'verifyEmail',
      component: () => import('./views/VerifyEmail.vue'),
    },
  ],
});

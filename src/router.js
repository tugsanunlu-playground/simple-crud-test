import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import store from './store';

import AppLogIn from './pages/AppLogIn.vue';
import AppSignUp from './pages/AppSignUp.vue';
import AppHome from './pages/AppHome.vue';
import AppBook from './pages/AppBook.vue';
import AppList from './pages/AppList.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: AppLogIn,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: AppSignUp,
    },
    {
      path: '/books',
      name: 'books',
      component: AppList,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit/:id',
      name: 'update-book',
      component: AppBook,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/new',
      name: 'new-book',
      component: AppBook,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      redirect: { name: 'home' },
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) next({ name: 'log-in' });
    else next();
  } else {
    next();
  }
});

export { router as default };

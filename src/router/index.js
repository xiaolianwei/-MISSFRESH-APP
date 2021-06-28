import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Classify from '../views/layout/Classify/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: { name: 'Classify' },
      },
      {
        path: 'classify',
        name: 'Classify',
        component: Classify,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/layout/Cart.vue'),
      },
    ],
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to, from);
  if (to.name === 'Search') {
    VueRouter.prototype.animationName = 'left';
  } else if (from.name === 'Search') {
    VueRouter.prototype.animationName = 'right';
  }
  next();
});

export default router;

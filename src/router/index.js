import { createRouter, createWebHashHistory } from 'vue-router';
import userRouter from '@/components/modules/user/router'
import isAuthenticatedGuard from './auth-guard'


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/components/views/Home.vue'),

  },
  {
    path: '/user',
    beforeEnter: [isAuthenticatedGuard],
    ...userRouter
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

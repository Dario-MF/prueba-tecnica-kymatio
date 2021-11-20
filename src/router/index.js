import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'home',
    /*  beforeEnter: [isAuthenticatedGuard], */
    component: () => import(/* webpackChunkName: "home" */ '@/components/views/Home.vue'),
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/components/modules/profile/views/Profile.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/components/modules/dashboard/views/Dashboard.vue'),
      },
      {
        path: '/sesions',
        name: 'sesions',
        component: () => import(/* webpackChunkName: "sesions" */ '@/components/modules/sesions/views/Sesions.vue'),
      },
      {
        path: '/faq',
        name: 'faq',
        component: () => import(/* webpackChunkName: "faq" */ '@/components/modules/faq/views/Faq.vue'),
      },
    ]
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

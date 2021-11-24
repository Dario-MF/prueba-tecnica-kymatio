export default {
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/components/modules/user/layouts/UserLayout.vue'),
    children: [
        {
            path: '/profile',
            name: 'profile',
            component: () => import(/* webpackChunkName: "profile" */ '@/components/modules/user/views/Profile.vue'),
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '@/components/modules/user/views/Dashboard.vue'),
        },
        {
            path: '/sesions',
            name: 'sesions',
            component: () => import(/* webpackChunkName: "sesions" */ '@/components/modules/user/views/Sesions.vue'),
        },
        {
            path: '/faq',
            name: 'faq',
            component: () => import(/* webpackChunkName: "faq" */ '@/components/modules/user/views/Faq.vue'),
        },
    ]
}
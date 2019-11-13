import NotFound from './views/404.vue'
import login from '@/views/login/login.vue'
import home from '@/views/login/home.vue'
let routes = [
    {
        path: '/login',
        component: login,
        name: 'login',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        children: [
            {
                path: '/',
                redirect: '/scoreAnnounce'
            },
            {
                path: '/scoreAnnounce',
                name: 'scoreAnnounce',
                component: () => import('@/views/scoreAnnounce/index.vue')
            },
            {
                path: '/scoreAccount',
                name: 'scoreAccount',
                component: () => import('@/views/scoreAccount/index.vue')
            },
            {
                path: '/scoreExchange',
                name: 'scoreExchange',
                component: () => import('@/views/scoreExchange/index.vue')
            },
            {
                path: '/companyMaintenance',
                name: 'companyMaintenance',
                component: () => import('@/views/companyMaintenance/index.vue')
            },
        ]
    }
];

export default routes;







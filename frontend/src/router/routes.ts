import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '',
        component: () => import('pages/landing/index.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'Authentication',
        path: '',
        component: () => import('pages/auth/index.vue'),
      },
      {
        path: 'callback',
        component: () => import('pages/auth/callback/index.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import('pages/dashboard/index.vue'),
      },
      {
        name: 'My Items',
        path: '/items',
        component: () => import('pages/dashboard/index.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

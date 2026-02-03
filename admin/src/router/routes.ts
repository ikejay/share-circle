import type { RouteRecordRaw } from 'vue-router'
import { authRoutes } from './auth'
import { dashboardRoutes } from './dashboard'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      ...dashboardRoutes,
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/BlankLayout.vue'),
    children: [
      ...authRoutes,
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

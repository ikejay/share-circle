export const dashboardRoutes = [
  {
    name: 'dashboard',
    path: '/',
    children: [
      {
        name: 'home',
        path: 'dashboard',
        component: () => import('../../pages/dashboard/home/index.vue')
      },
      {
        name: 'brands',
        path: 'brands',
        component: () => import('../../pages/dashboard/brands/index.vue'),
      },
      {
        name: 'products',
        path: 'products',
        component: () => import('../../pages/dashboard/products/index.vue'),
      },
    ],
  },
]

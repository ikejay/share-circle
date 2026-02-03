export const authRoutes = [
  {
    name: 'auth',
    path: 'auth',
    children: [
      {
        name: 'login',
        path: '',
        component: () => import('pages/auth/index.vue'),
      },
      {
        name: 'callback',
        path: 'callback',
        component: () => import('pages/auth/callback-page/index.vue'),
      },
    ],
  },
]

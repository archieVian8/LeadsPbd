
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name: 'Landing', component: () => import('pages/Landing.vue') }
    ]
  },

  {
    path: '/login-as',
    component: () => import('src/layouts/BlankLayout.vue'),
    children: [
      { path: '', name: 'LoginAs', component: () => import('pages/LoginAs.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

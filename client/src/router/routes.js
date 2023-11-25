
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

  {
    path: '/user',
    component: () => import('src/layouts/BlankLayout.vue'),
    children: [
      { path: 'login', name: 'UserLogin', component: () => import('pages/auth/user/Login.vue') },
      { path: 'register', name: 'UserRegister', component: () => import('pages/auth/user/Register.vue') },
      { path: 'home', name: 'UserHome', component: () => import('pages/user/Home.vue') }
    ]
  },

  {
    path: '/organizer',
    component: () => import('src/layouts/BlankLayout.vue'),
    children: [
      { path: 'login', name: 'OrganizerLogin', component: () => import('pages/auth/admin/Login.vue') },
      { path: 'register', name: 'OrganizerRegister', component: () => import('pages/auth/admin/Register.vue') }
    ]
  },

  {
    path: '/home',
    component: () => import('src/layouts/HeaderFooter.vue'),
    children: [
      { path: '', name: 'UserHome', component: () => import('pages/user/Home.vue') }
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

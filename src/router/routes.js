const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: {
        auth: true
      }},
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'secured', component: () => import('pages/SecuredPage.vue'), meta: {
        auth: true
      }},
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

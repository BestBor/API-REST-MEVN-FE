import { api } from 'src/boot/axios';

const redirectLink = async (to, from, next) => {
  console.log(to.params.nanoid);
  try {
   await api.get(``)
  } catch (error) {
    console.log(error);
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue'), meta: {
        auth: true
      }},
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { path: 'secured', component: () => import('pages/SecuredPage.vue'), meta: {
        auth: true
      }},
      { path: '/:nanoid', component: () => import('pages/RedirectPage.vue'),
        beforeEnter: redirectLink
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

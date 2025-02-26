import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '../stores/user-store'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta?.auth
    const userStore = useUserStore()

    // Si existe el token en memoria
    if (userStore.token) {
      return next()
    }

    // Sino existe el token
    if (localStorage.getItem('user')) {
      await userStore.refreshToken()
      if (requiredAuth) {
        // validar al usuario o token
        if (userStore.token) {
          return next()
        }
        return next("/login")
      }
    }

    return next()
  })

  return Router
})

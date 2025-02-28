import { defineStore } from "pinia"
import { api } from "src/boot/axios"
import { ref } from "vue"


export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

  const access = async (email, password) => {
    try {
      const res = await api.post('/auth/login', {
        email: email,
        password: password
      })
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
    } catch (error) {
      if (error.response) {
        throw (error.response.data)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  }

  const register = async (email, password) => {
    try {
      const res = await api.post('/auth/register', {
        email: email,
        password: password
      })
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
    } catch (error) {
      if (error.response) {
        throw (error.response.data)
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  }

  const logout = async () => {
    try {
      await api.get('auth/logout')
    } catch (error) {
      console.log(error);
    } finally {
      resetStore()
      sessionStorage.removeItem('user')
    }
  }

  const setTime = async () => {
    setTimeout(
      () => {
        refreshToken()
      },
      expiresIn.value * 1000 - 6000,
    )
  }

  const refreshToken = async () => {
    console.log("RefreshToken");
    try {
      const res = await api.get('/auth/refresh')
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
    } catch (error) {
      console.log(error)
      sessionStorage.removeItem('user')
    }
  }

  const resetStore = () => {
    token.value = null
    expiresIn.value = null

    sessionStorage.removeItem('user')
  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
    register
  }
})

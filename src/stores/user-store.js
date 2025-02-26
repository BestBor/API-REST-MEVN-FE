import { defineStore } from "pinia"
import { api } from "src/boot/axios"
import { ref } from "vue"


export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

  const access = async () => {
    try {
      const res = await api.post('/auth/login', {
        email: 'test@test.com',
        password: '123123',
      })
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      localStorage.setItem('user', true)
      setTime()
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    try {
      await api.get('auth/logout')
    } catch (error) {
      console.log(error);
    } finally {
      resetStore()
      localStorage.removeItem('user')
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
      localStorage.setItem('user', true)
      setTime()
    } catch (error) {
      console.log(error)
      localStorage.removeItem('user')
    }
  }

  const resetStore = () => {
    token.value = null
    expiresIn.value = null
  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout
  }
})

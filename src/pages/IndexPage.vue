<template>
  <q-page padding>
    <!-- <q-btn @click="userStore.access">Ingresar</q-btn> -->
    <q-btn @click="createLink">Crear Link</q-btn>
    <!-- <q-btn @click="userStore.logout">Cerrar sesión</q-btn> -->
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
// import axios from 'axios'
import { api } from 'src/boot/axios'
import { useUserStore } from '../stores/user-store'

const userStore = useUserStore()
// userStore.refreshToken()

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        Authorization: 'Bearer ' + userStore.token.value,
      },
      data: {
        longLink: 'https://www.youtube.com/@GitHub',
      },
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

</script>

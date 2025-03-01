<script setup>

import { ref } from "vue"
import { useUserStore } from "../stores/user-store"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

const $q = useQuasar()

const router = useRouter()
const userStore = useUserStore()
const email = ref("")
const password = ref("")
const repassword = ref("");

const handleSubmit = async () => {
  try {
    await userStore.register(email.value, password.value)
    router.push("/")
    email.value = ""
    password.value = ""
  } catch (error) {
    console.log(error);
    alertDialogBackend(error.error)
  }
}

const alertDialogBackend = (message = "Error en el servidor") => {
  $q.dialog({
      title: "Error",
      message
  })
}

</script>

<template>
<q-page padding class="row justify-center">
  <div class="col-12 col-sm-6 col-md-5">
    <h3>Register</h3>
    <q-form @submit.prevent="handleSubmit">
      <q-input
        v-model="email"
        label="Ingrese email"
        type="text"
        :rules="[
          (val) => (/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Formato de email incorrecto',
        ]">
      </q-input>

      <q-input
        v-model="password"
        label="Ingrese contraseña"
        type="password"
        :rules="[
          (val) => (val && val.length > 5) || 'La contraseña debe tener al menos 6 carácteres',
        ]">
      </q-input>

      <q-input
        v-model="repassword"
        label="Confirme contraseña"
        type="password"
        :rules="[
          (val) => (val && val === password) || 'No coinciden las contraseñas',
        ]"
      ></q-input>

      <div>
        <q-btn label="Register" type="submit"></q-btn>
      </div>

    </q-form>
  </div>
</q-page>
</template>

<style>

</style>

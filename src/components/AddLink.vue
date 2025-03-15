<script setup>
  import { ref } from "vue"
  import { useLinkStore } from "src/stores/link-store"

  const useLink = useLinkStore()

  const link = ref("")
  const addLink = async() => {
    try {
      await useLink.createLink(link.value)
    } catch (error) {
      console.log(error);
    }
  }
</script>

<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model="link"
      label="Ingrese link aquí"
    ></q-input>
    <q-btn class="q-mt-sm full-width" label="Agregar" color="primary" type="submit"></q-btn>
  </q-form>
</template>

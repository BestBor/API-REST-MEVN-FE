<script setup>
  import { ref } from "vue"
  import { useLinkStore } from "src/stores/link-store"
  import { useNotify } from "../composables/notifyHook"

  const useLink = useLinkStore()
  const { showNotify } = useNotify()

  const addForm = ref(null)
  const link = ref("")
  const loading = ref(false)

  const addLink = async() => {
    try {
      loading.value = true
      await useLink.createLink(link.value)
      showNotify('Link agregado con exito', 'green', 'announcement')
      link.value = ""
      addForm.value.resetValidation()
    } catch (error) {
      console.log(error);
      if (error.errors) {
        return error.errors?.forEach(element => {
          showNotify(element.msg)
        });
      }
      showNotify(error)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <q-form @submit.prevent="addLink" ref="addForm">
    <q-input
      v-model="link"
      label="Ingrese link aquí"
      :rules="[
        (val) => (val && val.trim() !== '') || 'Escribe algo por favor'
      ]"
      lazy-rules
    ></q-input>
    <q-btn
      class="q-mt-sm full-width"
      label="Agregar"
      color="primary"
      type="submit"
      :loading="loading"
    ></q-btn>
  </q-form>
</template>

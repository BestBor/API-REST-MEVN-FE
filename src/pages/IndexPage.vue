<template>
  <q-page padding>
    <q-btn @click="useLink.createLink">Crear Link</q-btn>
    <AddLink />
    <pre>
      {{useLink.links}}
    </pre>
  </q-page>
</template>

<script setup>

import { useLinkStore } from "../stores/link-store"

// Components
import AddLink from "src/components/AddLink.vue"

const useLink = useLinkStore()
// useLink.getLinks()

</script>

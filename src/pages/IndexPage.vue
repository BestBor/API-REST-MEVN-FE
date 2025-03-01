<template>
  <q-page padding>
    <q-btn @click="useLink.createLink">Crear Link</q-btn>
    <pre>
      {{useLink.links}}
    </pre>
  </q-page>
</template>

<script setup>

import { useLinkStore } from "../stores/link-store"

const useLink = useLinkStore()
// useLink.getLinks()

</script>

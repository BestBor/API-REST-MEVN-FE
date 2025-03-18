<template>
  <q-page padding>
    <AddLink />
    <pre>
      {{useLink.links}}
    </pre>
      <CardLink v-for="link in useLink.links" :key="link._id" />
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store"

// Components
import AddLink from "src/components/AddLink.vue"
import CardLink from "src/components/CardLink.vue"

const useLink = useLinkStore()
// useLink.getLinks()

</script>

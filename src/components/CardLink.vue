<script setup>
import { useLinkStore } from '../stores/link-store'
import { useQuasar } from 'quasar'

const useLink = useLinkStore()
const $q = useQuasar()

  defineProps({
    link: Object
  })

  const deleteLink = async (_id) => {
    console.log(_id)
    $q.dialog({
        title: 'Atención',
        message: '¿Desea eliminar este elemento?',
        cancel: true,
        persistent: true
      }).onOk(async() => {
        // console.log('>>>> OK')
        try {
          await useLink.removeLink(_id)
          console.log("Link eliminado");
        } catch (error) {
          console.log(error);
        }
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
  }

  const updateLink = async(link) => {
    $q.dialog({
        title: 'Actualizar link',
        message: 'Modifica el enlace',
        prompt: {
          model: link.longLink,
          type: 'text'
        },
        cancel: true,
        persistent: true,
      }).onOk(async (data) => {
        const modLink = { ...link, longLink: data }
        await useLink.modifyLink(modLink)
      })
  }

</script>

<template>
  <q-card class="one-card q-mb-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      {{ link }}
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="mdi-delete-variant" color="red" @click="deleteLink(link._id)"/>
      <q-btn flat round icon="mdi-pencil-outline" @click="updateLink(link)"/>
      <q-btn flat color="primary">Copiar</q-btn>
      <q-btn flat>
        7:30PM
      </q-btn>
      <q-btn flat color="primary">
        Reserve
      </q-btn>
    </q-card-actions>

  </q-card>
</template>

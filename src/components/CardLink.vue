<script setup>
import { useLinkStore } from '../stores/link-store'
import { useQuasar } from 'quasar'
import { useNotify } from '../composables/notifyHook'

const useLink = useLinkStore()
const $q = useQuasar()
const { errorNotify, successNotify } = useNotify()

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
          successNotify('Link eliminado')
        } catch (error) {
          console.log(error);
        }
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
        try {
          const modLink = { ...link, longLink: data }
          await useLink.modifyLink(modLink)
          successNotify('Link actualizado')
        } catch (error) {
          if (error.errors) {
            return error.errors?.forEach(element => {
              errorNotify(element.msg)
            });
          }
          errorNotify(error)
        }

      })
  }

  const copyLink = async(nanoLink) => {
    try {
      console.log(process.env.FRONT_URI);
      const path = `${process.env.FRONT_URI}/${nanoLink}`
      await navigator.clipboard.writeText(path)
      successNotify("Agregado al portapapeles")
    } catch (error) {
      console.log(error);
      errorNotify(error)
    }
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
      <q-btn flat color="primary" @click="copyLink(link.nanoLink)">Copiar</q-btn>
    </q-card-actions>

  </q-card>
</template>

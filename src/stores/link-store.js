import { defineStore } from "pinia"
import { ref } from "vue"
import { api } from "src/boot/axios"
import { useUserStore } from "./user-store"
import { useQuasar } from "quasar"

export const useLinkStore = defineStore("link", () => {

  const userStore = useUserStore()

  const links = ref([])
  const $q = useQuasar()

  $q.loadingBar.setDefaults({
    color: 'purple',
    size: '15px',
    position: 'top',
    indeterminate: true,
  })

  const createLink = async (link) => {
    try {
      $q.loadingBar.start()
      const res = await api({
        url: "/links",
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.token
        },
        data: {
          longLink: link
        }
      })
      links.value.push(res.data.newLink)
    } catch (error) {
      // console.log(error.response?.data || error)
      throw error.response?.data || error
    } finally {
      $q.loadingBar.stop()
    }
  }

  const getLinks = async () => {
    try {
      $q.loadingBar.start()
      const res = await api({
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token
        }
      })
      // links.value = res.data.links.map((item) => item)
      links.value = [...res.data.links]
    } catch (error) {
      throw error.response?.data || error
    } finally {
      $q.loadingBar.stop()
    }
  }

  const modifyLink = async (newLink) => {
    try {
      $q.loadingBar.start()
      await api({
        url: `links/${newLink._id}`,
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + userStore.token
        },
        data: {
          longLink: newLink.longLink
        }
      })
      links.value = links.value.map((item) => item._id === newLink._id ? newLink : item)
    } catch (error) {
      throw error.response?.data || error
    } finally {
      $q.loadingBar.stop()
    }
  }

  const removeLink = async (_id) => {
    try {
      $q.loadingBar.start()
      await api({
        url: `links/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token
        },
      })
      links.value = links.value.filter(item => item._id !== _id)
    } catch (error) {
      throw error.response?.data || error
    } finally {
      $q.loadingBar.stop()
    }
  }

  getLinks()

  return {
    createLink,
    links,
    getLinks,
    modifyLink,
    removeLink,
  }
})

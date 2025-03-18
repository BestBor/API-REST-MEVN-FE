import { useQuasar } from 'quasar'

export const useNotify = () => {
  const $q = useQuasar()
  const showNotify = (message = 'Error de Servidor', color = 'negative', icon) => {
    $q.notify({
      message,
      color,
      icon: icon || 'report_problem',
    })
  }

  return { showNotify }
}

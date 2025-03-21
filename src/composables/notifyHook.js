import { useQuasar } from 'quasar'

export const useNotify = () => {

  const $q = useQuasar()

  const errorNotify = (message = 'Error al realizar operación') => {
    $q.notify({
      message,
      color: 'negative',
      icon: 'report_problem',
    })
  }

  const successNotify = (message = 'Operación exitosa') => {
    $q.notify({
      message,
      color: 'green',
      icon: 'announcement',
    })
  }

  const showNotify = (message = 'Error de Servidor', color = 'negative', icon) => {
    $q.notify({
      message,
      color,
      icon: icon || 'report_problem',
    })
  }

  return { showNotify, errorNotify, successNotify }
}

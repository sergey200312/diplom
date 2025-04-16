import { toast } from 'react-toastify'

export const handleApiError = (error: any) => {
  const errorMessage = error?.data?.message || 'Произошла ошибка'
  toast.error(errorMessage)
}

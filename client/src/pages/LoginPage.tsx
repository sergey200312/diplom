import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation } from '../../store/api/authApi'
import { toast } from 'react-toastify'
import { handleApiError } from '../utils/handleApiError'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/features/authSlice'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../router/constants'

const formSchema = z.object({
  email: z.string().email({ message: 'Невалидный email' }),
  password: z.string().nonempty({ message: 'Пароль не должен быть пустым' }),
})

type FormValues = z.infer<typeof formSchema>

export const LoginPage: FC = () => {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await login(values).unwrap()
      const { token, _id, email, avatar_url } = response
      dispatch(authLogin({ token, _id, email }))
      toast.success('Вы успешно вошли в аккаунт')
      navigate(ROUTES.MAIN)
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 w-full max-w-sm shadow-md rounded bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Пароль"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

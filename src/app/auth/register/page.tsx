'use client'

import { useCallback } from 'react'
import styles from './register.module.css'

import _ from 'lodash'

// hooks
import { useFormState } from '@/hooks/useForm'
import { useApiMutation } from '@/hooks/useApi'
import { useHandleAuth } from '@/hooks/useAuth'

// types
import { AuthSuccess } from '@/types'
import { ENDPOINTS } from '@/config/endpoints'
import { Loading } from '@/components/common/Loading'
import { AuthLink } from '@/components/auth/AuthLink/AuthLink'
import { useToast } from '@/components/common/Toast/ToastContext'

const RegisterPage = () => {
  // auth helper
  const { handleAuth } = useHandleAuth()
  const { showToast } = useToast()

  const FormState = useFormState<{
    username: string
    password: string
  }>({
    initial: {
      username: '',
      password: '',
    },
  })

  const RegisterMutation = useApiMutation<AuthSuccess>(ENDPOINTS.AUTH.REGISTER, {
    onSuccess: (data) => {
      // TODO: handle success by moving them into the app
      handleAuth({
        token: data.accessToken,
        action: 'REGISTER',
      })

      showToast('Welcome to Igaming...', {
        status: 'success',
      })
    },
    onError: (error) => {
      showToast(_.get(error, 'response.data.message', 'An error occured.'), {
        status: 'error',
      })
    },
  })

  const handleSubmit = useCallback(async () => {
    // TODO: Improve this by adding a validation package like zod or yup
    if (!FormState.state.username) {
      showToast('Username is required', {
        status: 'error',
      })
      return
    }

    if (!FormState.state.password) {
      showToast('Password is required', {
        status: 'error',
      })
      return
    }

    // TODO: error handling should not be done with state, use a toast or a modal

    await RegisterMutation.mutateAsync(FormState.state)
  }, [FormState.state])

  return (
    <div className={styles.container}>
      <Loading isLoading={RegisterMutation.isPending}>
        <form className={styles.form}>
          <h2 className={styles.logo}>Igaming</h2>
          <h2>Welcome</h2>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="name"
              value={FormState.state.username}
              onChange={(e) =>
                FormState.field.mutate({
                  name: 'username',
                  value: e.target.value,
                })
              }
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={FormState.state.password}
              onChange={(e) =>
                FormState.field.mutate({
                  name: 'password',
                  value: e.target.value,
                })
              }
              required
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className={styles.button}
            disabled={RegisterMutation.isPending}
          >
            Get Started
          </button>
          <AuthLink type="register" />
        </form>
      </Loading>
    </div>
  )
}

export default RegisterPage

'use client'

import React, { useCallback } from 'react'
import styles from './login.module.css'
import { useFormState } from '@/hooks/useForm'
import _ from 'lodash'

// types
import { AuthSuccess } from '@/types'
import { useApiMutation } from '@/hooks/useApi'
import { useHandleAuth } from '@/hooks/useAuth'
import { ENDPOINTS } from '@/config/endpoints'
import { AuthLink } from '@/components/auth/AuthLink/AuthLink'
import { Loading } from '@/components/common/Loading'
import { useToast } from '@/components/common/Toast/ToastContext'

const LoginPage = () => {
  const { handleAuth } = useHandleAuth()

  const { showToast } = useToast()

  const Form = useFormState({
    initial: {
      username: '',
      password: '',
    },
  })

  const LoginMutation = useApiMutation<AuthSuccess>(ENDPOINTS.AUTH.LOGIN, {
    onSuccess: (data) => {
      // TODO: handle success by moving them into the app
      showToast('Welcome back to Igaming...', {
        status: 'success',
      })
      handleAuth({
        token: data.accessToken,
        action: 'LOGIN',
      })
    },
    onError: (error) => {
      // TODO: improve error handling by using a toast or a modal
      showToast(_.get(error, 'response.data.message') || 'An error occured', {
        status: 'error',
      })
    },
  })

  const handleSubmit = useCallback(async () => {
    // TODO: Improve this by adding a validation package like zod or yup
    if (!Form.state.username) {
      showToast('Username is required', {
        status: 'error',
      })
      return
    }

    if (!Form.state.password) {
      showToast('Password is required', {
        status: 'error',
      })
      return
    }

    // TODO: error handling should not be done with state, use a toast or a modal
    await LoginMutation.mutateAsync(Form.state)
  }, [Form.state])

  return (
    <div className={styles.container}>
      <Loading isLoading={LoginMutation.isPending}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.logo}>Igaming</h2>
          <h2>Login</h2>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="name"
              value={Form.state.username}
              onChange={(e) =>
                Form.field.mutate({
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
              value={Form.state.password}
              onChange={(e) => {
                Form.field.mutate({
                  name: 'password',
                  value: e.target.value,
                })
              }}
              required
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className={styles.button}
          >
            Continue Playing
          </button>
          <AuthLink type="login" />
        </form>
      </Loading>
    </div>
  )
}

export default LoginPage

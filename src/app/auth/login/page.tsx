'use client'

import React, { useCallback } from 'react'
import styles from './login.module.css'
import { useFormState } from '@/hooks/useForm'
import { useHandleFormErrors } from '@/hooks/useError'

import _ from 'lodash'

// types
import { AuthSuccess, FormErrors } from '@/types'
import { useApiMutation } from '@/hooks/useApi'
import { useHandleAuth } from '@/hooks/useAuth'
import { ENDPOINTS } from '@/config/endpoints'

const LoginPage = () => {
  const { handleAuth } = useHandleAuth()

  const { handleError, errors } = useHandleFormErrors<FormErrors>({
    initialValues: {
      username: '',
      password: '',
      server: '',
    },
  })

  const Form = useFormState({
    initial: {
      username: '',
      password: '',
    },
  })

  const LoginMutation = useApiMutation<AuthSuccess>(ENDPOINTS.AUTH.LOGIN, {
    onSuccess: (data) => {
      // TODO: handle success by moving them into the app
      handleAuth({
        token: data.accessToken,
        action: 'LOGIN',
      })
    },
    onError: (error) => {
      // TODO: improve error handling by using a toast or a modal
      handleError({
        key: 'server',
        value: _.get(error, 'response.data.message') || 'An error occured',
      })
    },
  })

  const handleSubmit = useCallback(async () => {
    // reset existing erros
    handleError({
      key: 'server',
      value: '',
      reset: true,
    })
    // TODO: Improve this by adding a validation package like zod or yup
    if (!Form.state.username) {
      handleError({
        key: 'username',
        value: 'Username is required',
      })
      return
    }

    if (!Form.state.password) {
      handleError({
        key: 'password',
        value: 'Password is required',
      })
      return
    }

    // TODO: error handling should not be done with state, use a toast or a modal
    await LoginMutation.mutateAsync(Form.state)
  }, [Form.state])

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.imageContainer} />
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
          <span>{errors.username && errors.username}</span>
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
      </form>
    </div>
  )
}

export default LoginPage

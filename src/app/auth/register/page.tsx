'use client'

import { useCallback } from 'react'
import styles from './register.module.css'

import _ from 'lodash'

// hooks
import { useFormState } from '@/hooks/useForm'
import { useApiMutation } from '@/hooks/useApi'
import { useHandleAuth } from '@/hooks/useAuth'
import { useHandleFormErrors } from '@/hooks/useError'

// types
import { AuthSuccess, FormErrors } from '@/types'
import { ENDPOINTS } from '@/config/endpoints'

const RegisterPage = () => {
  // auth helper
  const { handleAuth } = useHandleAuth()

  // TODO: remove this and replace with
  const { handleError, errors } = useHandleFormErrors<FormErrors>({
    initialValues: {
      username: '',
      password: '',
      server: '',
    },
  })

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
    if (!FormState.state.username) {
      handleError({
        key: 'username',
        value: 'Username is required',
      })
      return
    }

    if (!FormState.state.password) {
      handleError({
        key: 'password',
        value: 'Password is required',
      })
      return
    }

    // TODO: error handling should not be done with state, use a toast or a modal

    await RegisterMutation.mutateAsync(FormState.state)
  }, [FormState.state])

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.imageContainer} />
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
          <span>{errors.username && errors.username}</span>
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
          <span>{errors.password && errors.password}</span>
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

        <span className={styles.apiErrors}>{RegisterMutation.error && errors.server}</span>
      </form>
    </div>
  )
}

export default RegisterPage

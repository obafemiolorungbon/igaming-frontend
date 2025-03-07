'use client'

import { memo, useCallback } from 'react'
import styles from './ExitButton.module.css'
import { useRouter } from 'next/navigation'
import { COOKIE_KEYS, removeCookie } from '@/utils/cookie'
import { ROUTES } from '@/config/routes'

const ExitButtonComponent = () => {
  const router = useRouter()

  const handleExit = useCallback(() => {
    // remove cookies
    removeCookie(COOKIE_KEYS.ACCESS_COOKIE)

    // navigate to login page
    router.push(ROUTES.auth.login)
  }, [router])

  return (
    <button onClick={handleExit} className={styles.exitButton}>
      <span className={styles.icon}>⬅️</span>
      <span className={styles.text}>Exit Game</span>
    </button>
  )
}

export const ExitButton = memo(ExitButtonComponent)

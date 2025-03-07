'use client'

import { memo, useCallback } from 'react'
import styles from './BackButton.module.css'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/config/routes'

const BackButtonComponent = () => {
  const router = useRouter()

  const handleBack = useCallback(() => {
    router.push(ROUTES.app.dashboard)
  }, [router])

  return (
    <button onClick={handleBack} className={styles.backButton}>
      <span className={styles.icon}>⬅️</span>
      <span className={styles.text}>Back to Game</span>
    </button>
  )
}

export const BackButton = memo(BackButtonComponent)

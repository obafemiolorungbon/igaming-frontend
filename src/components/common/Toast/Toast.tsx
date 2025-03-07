'use client'

import { memo, useEffect } from 'react'
import styles from './Toast.module.css'

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export type ToastStatus = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  message: string
  status?: ToastStatus
  position?: ToastPosition
  duration?: number
  onClose: () => void
}

const ToastComponent = ({
  message,
  status = 'info',
  position = 'top-right',
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`${styles.toast} ${styles[position]} ${styles[status]}`}>
      <div className={styles.content}>
        {status === 'error' && <span className={styles.icon}>✕</span>}
        {status === 'success' && <span className={styles.icon}>✓</span>}
        {status === 'warning' && <span className={styles.icon}>!</span>}
        {status === 'info' && <span className={styles.icon}>i</span>}
        <p className={styles.message}>{message}</p>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>
    </div>
  )
}

export const Toast = memo(ToastComponent)

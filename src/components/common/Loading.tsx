'use client'

import { memo, type ReactNode } from 'react'
import styles from './Loading.module.css'

interface LoadingProps {
  children: ReactNode
  isLoading: boolean
  loadingText?: string
}

const LoadingComponent = ({ children, isLoading, loadingText = 'Loading...' }: LoadingProps) => {
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <span className={styles.loadingText}>{loadingText}</span>
      </div>
    )
  }

  return <>{children}</>
}

export const Loading = memo(LoadingComponent)

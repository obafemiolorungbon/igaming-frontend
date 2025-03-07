'use client'

import { memo, type ReactNode } from 'react'
import styles from './Loading.module.css'

interface LoadingProps {
  children: ReactNode
  isLoading: boolean
}

const LoadingComponent = ({ children, isLoading }: LoadingProps) => {
  return (
    <>
      {children}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
        </div>
      )}
    </>
  )
}

export const Loading = memo(LoadingComponent)

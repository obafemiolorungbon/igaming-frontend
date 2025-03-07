'use client'

import { useMemo } from 'react'
import styles from './GameLobby.module.css'

interface JoinButtonProps {
  onClick: () => void
  isLoading: boolean
  status?: string
  canJoin?: boolean
  joining?: boolean
}

export const JoinButton = ({ onClick, isLoading, status, canJoin, joining }: JoinButtonProps) => {
  const buttonText = useMemo(() => {
    const entity = {
      show: true,
      disabled: false,
      text: 'Join Round',
    }

    if (status === 'EXPIRED') {
      return {
        ...entity,
        text: 'Awaiting Next Game...',
        show: true,
        disabled: true,
      }
    }

    if (isLoading)
      return {
        ...entity,
        text: '',
        show: false,
        disabled: true,
      }

    if (!canJoin && status !== 'EXPIRED') {
      return {
        ...entity,
        text: 'Awaiting Game Start...',
        disabled: true,
      }
    }

    if (joining)
      return {
        ...entity,
        text: 'Joining Round...',
        disabled: true,
      }

    return entity
  }, [status, canJoin, isLoading, joining])

  if (!buttonText?.show) return null

  return (
    <button className={styles.joinButton} onClick={onClick} disabled={buttonText?.disabled}>
      {buttonText?.text}
    </button>
  )
}

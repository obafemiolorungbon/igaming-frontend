'use client'

import { useCallback, useState } from 'react'
import styles from './GameLobby.module.css'
import { SSE_EVENTS, useSSEHook } from '@/providers/SSE'

export const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(0)

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  useSSEHook<string>({
    event: {
      name: SSE_EVENTS.TIMER,
      handler: (event) => {
        const { remainingSeconds } = JSON.parse(event.data)
        setSeconds(remainingSeconds)
      },
    },
  })

  return (
    <div className={styles.timer}>
      <span className={styles.timerText}>Lucky Draw Starts In</span>
      <span className={styles.time}>{formatTime(seconds)}</span>
    </div>
  )
}

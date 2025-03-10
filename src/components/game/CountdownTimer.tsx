'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from './GameLobby.module.css'
import { SSE_EVENTS, useSSEHook } from '@/providers/SSE'
import { useGetSSEConfig, useReconnectSSE } from '@/providers/SSE/context/Hook'

interface CountdownTimerProps {
  activeLobby: boolean
}

export const CountdownTimer = ({ activeLobby }: CountdownTimerProps) => {
  const [seconds, setSeconds] = useState(0)
  const previousTimerRef = useRef(0)

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  const SSEState = useGetSSEConfig()
  const ReconnectSSE = useReconnectSSE()

  // TODO: a check to see if the timer is not running, if after one second, there is an active lobby
  // timer is not running, then we can asssume that SSE has a problem and then attempt to reconnect
  // different ways to check this
  // 1. save the current time in a ref, then after every second, we check if the seconds is equals to the ref .current, if it is, then we can assume that the timer is not running
  // 2.

  useEffect(() => {
    // if there is an active lobby and the seconds timer is equals to zero, we should attempt reconection
    if (activeLobby && seconds === 0) {
      ReconnectSSE(SSEState)
    }
  }, [seconds, SSEState, activeLobby])

  useSSEHook<string>({
    event: {
      name: SSE_EVENTS.TIMER,
      handler: (event) => {
        const { remainingSeconds } = JSON.parse(event.data)
        setSeconds((prev) => {
          previousTimerRef.current = prev
          return remainingSeconds
        })
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

'use client'

import { memo, useEffect, useMemo, useState } from 'react'
import styles from './DrawOverlay.module.css'

interface DrawOverlayProps {
  onDrawComplete?: (number: number) => void
  luckyNumber: number
  selectedNumber?: number
  status: string
}

const DrawOverlayComponent = ({
  onDrawComplete,
  luckyNumber,
  selectedNumber,
  status,
}: DrawOverlayProps) => {
  const [currentNumber, setCurrentNumber] = useState<number>(1)
  const [drawComplete, setDrawComplete] = useState(false)
  const [phase, setPhase] = useState<'shuffle' | 'slowdown' | 'final'>('shuffle')

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    let speed = 50 // Start fast

    const startDraw = () => {
      // Initial fast shuffle phase (2 seconds)
      intervalId = setInterval(() => {
        const nextNumber = Math.floor(Math.random() * 9) + 1
        setCurrentNumber(nextNumber)
      }, speed)

      // After 2 seconds, start slowing down
      setTimeout(() => {
        setPhase('slowdown')
        clearInterval(intervalId)
        speed = 200 // Slow down

        intervalId = setInterval(() => {
          const nextNumber = Math.floor(Math.random() * 9) + 1
          setCurrentNumber(nextNumber)
        }, speed)

        // After 1.5 more seconds, show final number
        setTimeout(() => {
          setPhase('final')
          clearInterval(intervalId)

          setCurrentNumber(luckyNumber)
          setDrawComplete(true)
          onDrawComplete?.(luckyNumber)
        }, 1500)
      }, 2000)
    }

    startDraw()

    return () => {
      clearInterval(intervalId)
    }
  }, [onDrawComplete, luckyNumber])

  const message = useMemo(() => {
    if (!selectedNumber) return 'You could have won!'
    // If the selected number is the lucky number
    if (selectedNumber === luckyNumber) {
      return 'Amazing! You got it right!'
    }
    return 'Better luck next time!'
  }, [selectedNumber, luckyNumber])

  /**
   * If the status is not active, then you need to render the overlay and with the message that the next round starts soon.
   */
  if (status !== 'ACTIVE') {
    return (
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h2 className={styles.title}>Next Round is Starting Soon...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2 className={styles.title}>{phase === 'final' ? message : 'Drawing number...'}</h2>

        <div className={`${styles.numberDisplay} ${drawComplete ? styles.complete : ''}`}>
          <span className={styles.number}>{currentNumber}</span>
          <div className={styles.glow} />
          {phase !== 'final' && <div className={styles.shuffleEffect} />}
        </div>

        {phase === 'final' && <p className={styles.message}>Next Round is Starting Soon...</p>}
      </div>

      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={
              {
                '--delay': `${Math.random() * 2}s`,
                '--position': `${Math.random() * 100}%`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  )
}

export const DrawOverlay = memo(DrawOverlayComponent)

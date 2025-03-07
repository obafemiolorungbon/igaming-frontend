'use client'

import { memo, useEffect, useState } from 'react'
import styles from './Announcer.module.css'
import { SSE_EVENTS, useSSEHook } from '@/providers/SSE'

interface AnnouncementMessage {
  id: string
  message: string
}

const AnnouncerComponent = () => {
  // handle announcements
  const [announcements, setAnnouncements] = useState<AnnouncementMessage[]>([])
  const [isVisible, setIsVisible] = useState(false)

  let timer: NodeJS.Timeout

  useEffect(() => {
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useSSEHook<string>({
    event: {
      name: SSE_EVENTS.PLAYER_JOINED,
      handler: (event) => {
        console.log('THIS EVENTWAS TRIGGERED', event)
        const { username } = JSON.parse(event.data)
        const newAnnouncement = {
          id: Math.random().toString(36).substr(2, 9),
          message: `${username} has joined the game!`,
        }

        setAnnouncements((prev) => [...prev, newAnnouncement])
        setIsVisible(true)

        // Remove the announcement after animation
        timer = setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => {
            setAnnouncements((prev) => prev.filter((a) => a.id !== newAnnouncement.id))
          }, 300) // Wait for fade out animation
        }, 3000)
      },
    },
  })

  console.log('these are announcements', announcements)

  if (!isVisible || announcements.length === 0) return null

  return (
    <div className={styles.announcerContainer}>
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className={`${styles.announcement} ${isVisible ? styles.visible : styles.hidden}`}
        >
          <div className={styles.icon}>👋</div>
          <p className={styles.message}>{announcement.message}</p>
        </div>
      ))}
    </div>
  )
}

export const Announcer = memo(AnnouncerComponent)

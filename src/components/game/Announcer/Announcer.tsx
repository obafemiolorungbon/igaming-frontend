'use client'

import { memo } from 'react'
import { SSE_EVENTS, useSSEHook } from '@/providers/SSE'
import { useToast } from '@/components/common/Toast/ToastContext'

const AnnouncerComponent = () => {
  // handle announcements
  const { showToast } = useToast()

  useSSEHook<string>({
    event: {
      name: SSE_EVENTS.PLAYER_JOINED,
      handler: (event) => {
        const { username } = JSON.parse(event.data)
        const newAnnouncement = {
          message: `${username} has joined the game!`,
        }

        showToast(newAnnouncement.message, {
          status: 'info',
        })
      },
    },
  })

  return null
}

export const Announcer = memo(AnnouncerComponent)

'use client'

import { SSE_EVENTS, useSSEHook } from '@/providers/SSE'
import { useToast } from '@/components/common/Toast/ToastContext'

export const Announcer = () => {
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

'use client'

import styles from './GameLobby.module.css'

import _ from 'lodash'

// Components
import { CountdownTimer } from '@/components/game/CountdownTimer'
import { UserStats } from '@/components/game/UserStats'
import { JoinButton } from '@/components/game/JoinButton'
import { Announcer } from '@/components/game/Announcer/Announcer'
import { NumberSelector } from '@/components/game/NumberSelector/NumberSelector'
import { DrawOverlay } from '@/components/game/DrawOverlay/DrawOverlay'
import { ExitButton } from '@/components/game/ExitButton/ExitButton'

// hooks
import { SSE_EVENTS, useSSEHook } from '@/providers/SSE'
import { useGetLobby, useJoinLobby, useInvalidateLobbyQueries } from '@/hooks/useLobby'
import { useToast } from '@/components/common/Toast/ToastContext'
import { useCallback, useMemo, useState } from 'react'

export const GameLobby = () => {
  const { showToast } = useToast()

  const [draw, setDraw] = useState({
    luckyNumber: 0,
    isDrawing: false,
    isOpened: false,
    selectedNumber: 0,
  })

  // queries
  const ActiveLobby = useGetLobby()
  const invalidateQueries = useInvalidateLobbyQueries()

  const handleDrawComplete = useCallback(() => {
    setTimeout(() => {
      invalidateQueries()
    }, 3000)
  }, [showToast, invalidateQueries])

  useSSEHook<string>({
    event: {
      name: SSE_EVENTS.EXPIRED,
      handler: (event) => {
        const { winningNumber } = JSON.parse(event.data)
        setDraw((prev) => ({
          ...prev,
          luckyNumber: winningNumber,
          isDrawing: true,
          isOpened: true,
        }))
      },
    },
  })

  useSSEHook({
    event: {
      name: SSE_EVENTS.NEW_LOBBY,
      handler: () => {
        setDraw({
          luckyNumber: 0,
          isDrawing: false,
          isOpened: false,
          selectedNumber: 0,
        })
        invalidateQueries()
      },
    },
  })

  const canShowOverlay = useMemo(() => {
    if (ActiveLobby.data?.lobby?.status === 'EXPIRED') {
      return true
    }
    return draw.isDrawing
  }, [ActiveLobby.data?.lobby?.status, draw.isDrawing])

  const JoinGameLobby = useJoinLobby({
    actions: {
      onJoin: () => {
        invalidateQueries()
      },
      onError: (error) => {
        showToast(_.get(error, 'response.data.message', 'Failed to join lobby'), {
          status: 'error',
        })
      },
    },
  })

  const canShowSelector = useMemo(() => {
    if (!ActiveLobby.data?.lobby) return false
    return !ActiveLobby.data?.lobby?.canJoin && !JoinGameLobby.isLoading
  }, [ActiveLobby, JoinGameLobby])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ExitButton />
        <UserStats />
      </div>

      <div className={styles.content}>
        <CountdownTimer />

        {canShowSelector && (
          <div className={styles.gameControls}>
            <NumberSelector
              // todo: change this
              selectedNumber={draw.selectedNumber}
              disabled={false}
              actions={{
                onSelect: (selectedNumber) => {
                  setDraw((prev) => ({
                    ...prev,
                    selectedNumber,
                  }))
                },
                onError: () => {},
              }}
            />
          </div>
        )}

        {!canShowSelector && (
          <JoinButton
            onClick={() => JoinGameLobby.JoinLobby({})}
            isLoading={ActiveLobby.isLoading}
            joining={JoinGameLobby.isLoading}
            status={ActiveLobby.data?.lobby?.status}
            canJoin={ActiveLobby.data?.lobby?.canJoin}
          />
        )}

        <div className={styles.lobbyInfo}>
          <div className={styles.playerCount}>
            <span className={styles.currentPlayers}>
              {ActiveLobby?.data?.lobby?.playerCount || 0}
            </span>
            <span className={styles.playersLabel}>Player(s) Joined</span>
          </div>
        </div>
      </div>

      <Announcer />
      {canShowOverlay && (
        <DrawOverlay
          luckyNumber={draw.luckyNumber}
          selectedNumber={draw.selectedNumber}
          onDrawComplete={handleDrawComplete}
          status={ActiveLobby.data?.lobby?.status}
        />
      )}
    </div>
  )
}

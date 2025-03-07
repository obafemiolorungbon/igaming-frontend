'use client'

import { useGetUserInformation } from '@/hooks/useUser'
import styles from './GameLobby.module.css'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

// components
import { Loading } from '../common/Loading'

export const UserStats = () => {
  const router = useRouter()
  const { data, isLoading } = useGetUserInformation()

  const handleLeaderboardClick = useCallback(() => {
    router.push('/app/leaderboard')
  }, [router])

  return (
    <Loading isLoading={isLoading}>
      <div className={styles.stats}>
        <span className={styles.username}>{data?.username}</span>
        <div className={styles.record}>
          <span className={styles.wins}>Wins: {data?.games?.won}</span>
          <span className={styles.losses}>Losses: {data?.games?.lost}</span>
        </div>
        <button onClick={handleLeaderboardClick} className={styles.leaderboardButton}>
          <span className={styles.trophyIcon}>🏆</span>
          Leaderboard
        </button>
      </div>
    </Loading>
  )
}

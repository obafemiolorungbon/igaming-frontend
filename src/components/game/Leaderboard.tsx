'use client'

import { Loading } from '../common/Loading'
import styles from './Leaderboard.module.css'
import { useGetLeaderboard } from '@/hooks/useLobby'

export const Leaderboard = () => {
  const LeaderboardStats = useGetLeaderboard()

  return (
    <div className={styles.container}>
      <Loading isLoading={LeaderboardStats.isLoading}>
        <h1 className={styles.title}>Top Players</h1>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {LeaderboardStats?.data?.leaderboard?.map((entry) => (
                <tr key={entry.username}>
                  <td>
                    <span className={styles.rank}>#{entry.rank}</span>
                  </td>
                  <td>
                    <span className={styles.username}>{entry.username}</span>
                  </td>
                  <td>
                    <span className={styles.score}>{entry.gamesWon * 100}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Loading>
    </div>
  )
}

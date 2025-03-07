export interface AuthSuccess {
  accessToken: string
  user: {
    username: string
  }
}

export interface FormErrors {
  username: string
  password: string
  server: string
}

export interface LobbyResponse {
  lobby: {
    id: string
    playerCount: number
    status: string
    canJoin: boolean
  }
}

export interface SelectRandonNumberResponse {
  canJoin: boolean
  expiryTime: number
  playerCount: number
  selectedNumber: number
  status: string
  timeToExpire: number
}

export interface LeaderboardResponse {
  leaderboard: Array<{
    gamesWon: number
    points: number
    rank: number
    username: string
  }>
}

/**
 * Types
 */
export type { SSEConfig } from './types'
export type { UseServerSideEventsProps } from './context/Hook'

/**
 * Context/Singleton
 */
export { SSEManager } from './context/Manager'
export { useSSEHook } from './context/Hook'

export const SSE_EVENTS = {
  TIMER: 'timer',
  PLAYER_JOINED: 'playerJoined',
  EXPIRED: 'expired',
  NEW_LOBBY: 'newLobby',
} as const

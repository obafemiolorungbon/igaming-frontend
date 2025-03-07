/**
 * Lobby Management Hooks
 */

import { useCallback, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

// API Hooks
import { useApiMutation, useApiQuery } from './useApi'

// COnfig
import { ENDPOINTS } from '@/config/endpoints'

import { LeaderboardResponse, LobbyResponse } from '@/types'
interface JoinLobbyProps {
  actions: {
    onJoin: () => void
    onError: (error: {
      message: string
      response: {
        data: {
          message: string
        }
      }
    }) => void
  }
}

export const useInvalidateLobbyQueries = () => {
  const queryClient = useQueryClient()

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [ENDPOINTS.LOBBY.GET] })
    queryClient.invalidateQueries({ queryKey: [ENDPOINTS.USER.ME] })
    queryClient.invalidateQueries({ queryKey: [ENDPOINTS.USER.STATS] })
  }, [])

  return invalidate
}

export const useJoinLobby = ({ actions }: JoinLobbyProps) => {
  const invalidateQueries = useInvalidateLobbyQueries()

  const JoinLobbyMutation = useApiMutation(ENDPOINTS.LOBBY.JOIN, {
    onError: (error: any) => {
      // if there was an error joining the lobby
      actions.onError(error)
    },
    onSuccess: () => {
      // if the lobby was joined successfully
      actions.onJoin()

      // invalidate the lobby query
      invalidateQueries()
    },
  })

  return {
    JoinLobby: JoinLobbyMutation.mutate,
    isLoading: JoinLobbyMutation.isPending,
  }
}

export const useGetLobby = () => {
  // here we check for the available lobby, for now, there can only be one lobby at a time
  // TODO: add support for multiple lobbies

  const GetLobbyQuery = useApiQuery<LobbyResponse>(ENDPOINTS.LOBBY.GET)

  return {
    data: GetLobbyQuery.data,
    isLoading: GetLobbyQuery.isLoading,
  }
}

// subscribe to events in the lobby
export const useLobbyEvents = () => {
  // handle lobby events
  const [lobby, setLobby] = useState({
    timer: 0,
    currentPlayers: 0,
  })

  const handleLobbyEvents = useCallback((event: MessageEvent) => {
    console.log('this is sthe event', event)
  }, [])

  return {
    lobby,
    handleLobbyEvents,
  }
}

export const useGetLeaderboard = () => {
  const GetLeaderboardQuery = useApiQuery<LeaderboardResponse>(ENDPOINTS.LOBBY.LEADERBOARD)

  return {
    data: GetLeaderboardQuery.data,
    isLoading: GetLeaderboardQuery.isLoading,
  }
}

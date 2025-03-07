/**
 * User Management Hooks
 */

// API Hooks
import { useApiQuery } from './useApi'

// COnfig
import { ENDPOINTS } from '@/config/endpoints'

export const useGetUserInformation = () => {
  const UserInformationQuery = useApiQuery<{
    username: string
    games: {
      won: number
      lost: number
      total: number
    }
  }>(ENDPOINTS.USER.ME)

  return {
    data: UserInformationQuery.data,
    isLoading: UserInformationQuery.isLoading,
  }
}

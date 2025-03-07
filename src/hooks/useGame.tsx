/**
 * Game Play Hooks/Logic
 */

import { useApiMutation } from './useApi'
import { ENDPOINTS } from '@/config/endpoints'

// types
import { SelectRandonNumberResponse } from '@/types'

interface SelectRandomNumberProps {
  actions: {
    onSelect: (data: SelectRandonNumberResponse) => void
    onError: (error) => void
  }
}

export const useSelectRandomNumber = ({ actions }: SelectRandomNumberProps) => {
  const SelectLuckyNumberMutation = useApiMutation<SelectRandonNumberResponse>(
    ENDPOINTS.LOBBY.SELECT,
    {
      onError: (error) => {
        // if there was an error selecting the lucky number
        actions.onError(error)
      },
      onSuccess: (data) => {
        // if the lucky number was selected successfully
        actions.onSelect(data)
      },
    }
  )

  return {
    SelectLuckyNumber: SelectLuckyNumberMutation.mutate,
    isLoading: SelectLuckyNumberMutation.isPending,
  }
}

import { 
  useQuery, 
  useMutation, 
  UseQueryOptions, 
  UseMutationOptions,
} from '@tanstack/react-query'
import { axiosClient } from '@/setup/axios-client'
import { AxiosError } from 'axios'

// Type for API error responses
export interface ApiError extends AxiosError {
  message: string
  code?: string
  status?: number
}

// Generic type for API responses
export type ApiResponse<T> = {
  data: T
  status: number
  message?: string
}

// Custom hook for GET requests
export const useApiQuery = <TData = unknown, TError = ApiError>(
  url: string,
  queryKey?: string[],
  options?: UseQueryOptions<TData, TError>
) => {
  return useQuery<TData, TError>({
    queryKey: queryKey || [url],
    queryFn: async () => {
      const response = await axiosClient.get<TData>(url)
      return response.data
    },
    ...options,
  })
}

// Custom hook for POST requests
export const useApiMutation = <TData = unknown, TVariables = unknown, TError = ApiError>(
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables>
) => {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const response = await axiosClient.post<TData>(url, variables)
      return response.data
    },
    ...options,
  })
}

// Custom hook for PUT requests
export const useApiPut = <TData = unknown, TVariables = unknown, TError = ApiError>(
  url: string,
  options?: UseMutationOptions<ApiResponse<TData>, TError, TVariables>
) => {
  return useMutation<ApiResponse<TData>, TError, TVariables>({
    mutationFn: async (variables) => {
      const response = await axiosClient.put<ApiResponse<TData>>(url, variables)
      return response.data
    },
    ...options,
  })
}

// Custom hook for DELETE requests
export const useApiDelete = <TData = unknown, TError = ApiError>(
  url: string,
  options?: UseMutationOptions<ApiResponse<TData>, TError, void>
) => {
  return useMutation<ApiResponse<TData>, TError>({
    mutationFn: async () => {
      const response = await axiosClient.delete<ApiResponse<TData>>(url)
      return response.data
    },
    ...options,
  })
} 
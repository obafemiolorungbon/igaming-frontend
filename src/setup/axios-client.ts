'use client'

import axios from 'axios'

import { CONFIG } from '@/config/index.config'
import { COOKIE_KEYS, getCookie } from '@/utils/cookie'
import { ROUTES } from '@/config/routes'

export const axiosClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // You can add auth token here
    const token = getCookie(COOKIE_KEYS.ACCESS_COOKIE)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 errors (unauthorized) - you might want to refresh token here
    if (error.response?.status === 401 && !originalRequest._retry) {
      // originalRequest._retry = true
      // window.location.href = ROUTES.auth.login
    }

    return Promise.reject(error)
  }
)

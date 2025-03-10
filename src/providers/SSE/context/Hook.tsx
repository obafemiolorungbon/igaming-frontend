'use client'

import { useCallback, useEffect, useMemo } from 'react'

import _ from 'lodash'

// SSE Manager
import { SSEManager } from './Manager'
import { COOKIE_KEYS } from '@/utils/cookie'
import { useCookies } from 'react-cookie'

// types
import { SSEConfig } from '../types'

// config
import { CONFIG } from '@/config/index.config'
import { ENDPOINTS } from '@/config/endpoints'

export interface UseServerSideEventsProps<T> {
  event: {
    name: string
    handler: (event: MessageEvent<T>) => void
  }
}

export const useSSEHook = <T extends Record<string, unknown> | string>(
  props: UseServerSideEventsProps<T>
) => {
  const SSEAppManager = SSEManager.getInstance()

  const SSEEnabled = useMemo(
    () => !!SSEAppManager?.eventSource && !!props.event.name && !!props.event.handler,
    [SSEAppManager, props.event]
  )

  useEffect(() => {
    if (!SSEEnabled || !SSEAppManager?.eventSource) {
      return
    }

    const eventHandler = (event: MessageEvent<T>) => {
      props.event.handler(event)
    }

    SSEAppManager.eventSource.addEventListener(props.event.name, eventHandler)

    return () => {
      if (SSEEnabled && SSEAppManager?.eventSource) {
        SSEAppManager.eventSource.removeEventListener(props.event.name, eventHandler)
      }
    }
  }, [SSEEnabled, props.event, SSEAppManager])
}

export const useReconnectSSE = () => {
  const SSEAppManager = SSEManager.getInstance()

  const reconnect = useCallback(
    (state: SSEConfig) => {
      SSEAppManager.initialize(state)
    },
    [SSEAppManager]
  )

  return reconnect
}

export const useGetSSEConfig = () => {
  const SessionCookies = useCookies([COOKIE_KEYS.ACCESS_COOKIE])

  const state = useMemo(() => {
    const state: SSEConfig = {
      url: `${CONFIG.API_BASE_URL}${ENDPOINTS.LOBBY.EVENTS}`,
      params: undefined,
    }

    if (!SessionCookies) {
      return state
    }

    if (!_.isEmpty(SessionCookies)) {
      _.set(state, 'params.token', _.get(SessionCookies, COOKIE_KEYS.ACCESS_COOKIE))
    }

    return state
  }, [SessionCookies])

  return state
}

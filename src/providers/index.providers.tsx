'use client'

import { ReactNode, useMemo } from 'react'
import { IgamingQueryProvider } from './Request'
import _ from 'lodash'

// providers
import { SSEManager, type SSEConfig } from '@/providers/SSE'

// config
import { CONFIG } from '@/config/index.config'
import { ENDPOINTS } from '@/config/endpoints'
import { COOKIE_KEYS, getCookie } from '@/utils/cookie'

export const Providers = ({ children }: { children: ReactNode }) => {
  // - get the cookie for the session

  /**
   * Parse config socket
   */
  useMemo(() => {
    const state: SSEConfig = {
      url: `${CONFIG.API_BASE_URL}${ENDPOINTS.LOBBY.EVENTS}`,
      params: undefined,
    }

    const SessionCookie = getCookie(COOKIE_KEYS.ACCESS_COOKIE)
    //No session, exit.
    if (!SessionCookie) {
      return state
    }

    // add cookied jwt as headers
    if (!_.isEmpty(SessionCookie)) {
      _.set(state, 'params.token', SessionCookie)
    }
    SSEManager.getInstance().initialize(state)
  }, [])

  return <IgamingQueryProvider>{children}</IgamingQueryProvider>
}

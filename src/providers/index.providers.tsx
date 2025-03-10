'use client'

import { ReactNode, useEffect } from 'react'
import { IgamingQueryProvider } from './Request'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
// providers
import { SSEManager, type SSEConfig } from '@/providers/SSE'

// config
import { CONFIG } from '@/config/index.config'
import { ENDPOINTS } from '@/config/endpoints'
import { COOKIE_KEYS } from '@/utils/cookie'

export const Providers = ({ children }: { children: ReactNode }) => {
  // - get the cookie for the session
  const [SessionCookie] = useCookies([COOKIE_KEYS.ACCESS_COOKIE])

  /**
   * Parse config socket
   */
  useEffect(() => {
    const state: SSEConfig = {
      url: `${CONFIG.API_BASE_URL}${ENDPOINTS.LOBBY.EVENTS}`,
      params: undefined,
    }

    //No session, exit.
    if (!SessionCookie) {
      return
    }

    if (SSEManager.getInstance().eventSource) {
      return
    }

    // add cookied jwt as headers
    if (!_.isEmpty(SessionCookie)) {
      _.set(state, 'params.token', _.get(SessionCookie, COOKIE_KEYS.ACCESS_COOKIE))
    }
    SSEManager.getInstance().initialize(state)
  }, [SessionCookie])

  return <IgamingQueryProvider>{children}</IgamingQueryProvider>
}

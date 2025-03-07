'use client'

import { useEffect, useMemo } from 'react'

// SSE Manager
import { SSEManager } from './Manager'

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
    if (
      !SSEEnabled ||
      !SSEAppManager?.eventSource ||
      SSEAppManager.eventSource.readyState !== EventSource.OPEN
    ) {
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

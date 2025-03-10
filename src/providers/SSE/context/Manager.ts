import type { SSEConfig } from '../types'

import qs from 'qs'

export class SSEManager {
  private static instance: SSEManager | null = null
  public eventSource: EventSource | null = null

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): SSEManager {
    if (!SSEManager.instance) {
      SSEManager.instance = new SSEManager()
    }
    return SSEManager.instance
  }

  public initialize(setup: SSEConfig): void {
    if (this.eventSource) {
      return
    }

    const url = new URL(setup.url)
    if (setup.params) {
      const params = qs.stringify(setup.params)
      url.search = params
    }

    this.eventSource = new EventSource(url)

    this.eventSource.onopen = () => {
      console.log('SSE connection opened.')
    }

    this.eventSource.onmessage = (event) => {
      console.log('Message received:', event.data)
    }

    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error)
      this.closeConnection()

      // schedule a reconnect
      setTimeout(() => {
        this.initialize(setup)
      }, 1000)
    }
  }

  /**
   * Close the current EventSource connection.
   */
  public closeConnection(): void {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    } else {
      console.warn('No EventSource connection to close.')
    }
  }

  /**
   * Check if the EventSource connection is open.
   */
  public isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN
  }
}

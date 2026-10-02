import * as Sentry from '@sentry/react'

/**
 * Initializes Sentry React SDK for production error tracking and performance profiling.
 * @prompt Initialize Sentry for React with graceful DSN handling and tracingSampleRate.
 * @see docs/PROMPT_JOURNEY.md#41-sentry-sdk-setup--environment-configuration
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!dsn || dsn === 'tu-dsn-aqui') {
    console.warn('Sentry DSN not configured. Add your real DSN in .env.local to send events.')
    return
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.VITE_ENV || 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}

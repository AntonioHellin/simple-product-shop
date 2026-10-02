import * as Sentry from '@sentry/react'
import type { ReactNode } from 'react'

// IMPORTANTE: Sentry pasa error como `unknown`, no como `Error`
// Usar render function pattern en vez de pasar componente directo

function ErrorFallback({ error, resetError }: { error: unknown; resetError: () => void }) {
  // Type guard para obtener mensaje seguro
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{errorMessage}</p>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={resetError}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => Sentry.showReportDialog()}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Report feedback
          </button>
        </div>
      </div>
    </div>
  )
}

export function SentryErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => <ErrorFallback error={error} resetError={resetError} />}
      showDialog
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}

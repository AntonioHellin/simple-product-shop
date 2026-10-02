import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initSentry } from './infrastructure/sentry'
import { SentryErrorBoundary } from './infrastructure/SentryErrorBoundary'
import { CartProvider } from './context/CartContext'
import App from './App'
import './index.css'

// Inicializar Sentry ANTES de todo
initSentry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SentryErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </SentryErrorBoundary>
  </StrictMode>,
)



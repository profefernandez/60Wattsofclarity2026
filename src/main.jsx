import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initModernizr } from './modernizr.js'
import './analytics.js'
import './index.css'
import App from './App.jsx'
import { AppStateProvider } from './state/AppStateProvider.jsx'

initModernizr()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from 'primereact/api'

// Order matters: the PrimeReact theme is unlayered CSS, so it must load before
// index.css, whose component overrides are also unlayered and need to win.
import 'primereact/resources/themes/lara-light-amber/theme.css'
import 'primeicons/primeicons.css'
import './index.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrimeReactProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@autostorejs/devtools"
import App from './App.tsx'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

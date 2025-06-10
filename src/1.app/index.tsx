import App from '@pages/root/ui'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@app/styles/index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Не найден элемент с id \'root\'')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

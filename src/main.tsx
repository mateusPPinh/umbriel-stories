/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Theme from './styles/index'
import '@fontsource/roboto'
// Importando estilos de grid explicitamente para garantir sua inclusão pelo Tailwind
import './components/PageblockV2/styles/grid-utils.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
)

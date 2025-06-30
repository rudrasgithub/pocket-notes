import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import GroupsProvider from './Context/api/GroupsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GroupsProvider>
      <App />
    </GroupsProvider>
  </StrictMode>
)

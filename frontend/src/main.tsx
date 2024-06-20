import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext.tsx'
import { SocketProvider } from './Context/SocketContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <AuthContextProvider>
      <SocketProvider >
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </SocketProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

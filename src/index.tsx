import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ReactQueryConfigProvider } from 'react-query'
import { AuthProvider } from './providers/AuthProvider'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactQueryConfigProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ReactQueryConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

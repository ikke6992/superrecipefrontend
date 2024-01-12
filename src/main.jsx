import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateProvider } from './assets/StateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StateProvider>
    <App />
  </StateProvider>
  
)

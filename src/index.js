import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'

const container = document.getElementById('root')
const isSSR = container.hasChildNodes()

const app = (
  <Router>
    <App />
  </Router>
)

isSSR ? hydrateRoot(container, app) : createRoot(container).render(app)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

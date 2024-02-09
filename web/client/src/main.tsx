import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import ControllerTest from './components/ControllerTest.tsx'
import SocketTest from './components/SocketTest.tsx'
import ControllerTest from './components/ControllerTest.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <ControllerTest/> */}
    <SocketTest />
    <ControllerTest />
  </React.StrictMode>,
)

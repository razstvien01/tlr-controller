import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import ControllerTest from './components/ControllerTest.tsx'
import SocketTest from './components/SocketTest.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    {/* <ControllerTest/> */}
    <SocketTest/>
  </React.StrictMode>,
)

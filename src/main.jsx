import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './globals.css'
import './mobile.css' // 引入移动端9:16比例适配样式
import './auth.css' // 引入登录和注册页面样式

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
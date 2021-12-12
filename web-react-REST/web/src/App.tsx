import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import MainView from './views/MainView'
import LoginView from './views/auth/LoginView'
import SignUpView from './views/auth/SingUpView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginView />} />
        <Route path='/signup' element={<SignUpView />} />
        <Route path='/' element={<MainView />} />
      </Routes>
    </Router>
  )
}

export default App

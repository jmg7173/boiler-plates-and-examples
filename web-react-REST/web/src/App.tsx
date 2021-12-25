import React, { useEffect } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import 'antd/dist/antd.css'
import MainView from './views/MainView'
import LoginView from './views/auth/LoginView'
import SignUpView from './views/auth/SingUpView'
import NavBar from './components/NavBar'
import NotFoundView from './views/error/NotFoundView'
import { useSetRecoilState } from 'recoil'
import { meState } from './stores/me'
import { getMe } from './utils/fetch/fetchAPI'

function App() {
  const setMe = useSetRecoilState(meState)

  useEffect(() => {
    const f = async () => {
      const user = await getMe()
      if (user) {
        setMe({
          id: user.id,
          username: user.username,
          profileImgPath: user.profile_img_path,
        })
      }
    }
    f()
  })

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/login' element={<LoginView />} />
        <Route path='/signup' element={<SignUpView />} />
        <Route path='/' element={<MainView />} />
        <Route path='/404' element={<NotFoundView />} />
        <Route path='*' element={<Navigate replace to ='/404' />} />
      </Routes>
    </Router>
  )
}

export default App

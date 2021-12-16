import React, { useEffect } from 'react'
import { Container } from './MainView.style'
import NavBar from '../components/NavBar'
import { useSetRecoilState } from 'recoil'
import { meState } from '../stores/me'
import { getMe } from '../utils/fetch/fetchAPI'

const MainView: React.FC = () => {
  const setMe = useSetRecoilState(meState)

  useEffect(() => {
    const f = async () => {
      const user = await getMe()
      setMe(user)
    }
    f()
  }, [])

  return (
    <>
      <NavBar />
      <Container></Container>
    </>
  )
}

export default MainView

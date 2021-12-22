import React, { useEffect, useState } from 'react'
import { Container, LeftContainer, Logo, RightContainer } from './NavBar.style'
import { Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { meState } from '../stores/me'
import { fetchImg, logout } from '../utils/fetch/fetchAPI'

const NavBar: React.FC = () => {
  const [me, setMe] = useRecoilState(meState)
  const [profileImgURL, setProfileImgURL] = useState<string>('')

  useEffect(() => {
    const f = async () => {
      if (me) {
        const imgURL = await fetchImg(me.profileImgPath).then(
          (blob) => {
            console.log(blob)
            return URL.createObjectURL(blob)
          })
        console.log(imgURL)
        setProfileImgURL(imgURL)
      } else {
        setProfileImgURL('')
      }
    }
    f()
  }, [me])

  return (
    <Container>
      <LeftContainer>
        <Link to='/'>
          <Logo className='logo'>
            Boiler plate app
          </Logo>
        </Link>
      </LeftContainer>
      <RightContainer>
        {me
          ? (<>
            {profileImgURL && <img src={profileImgURL} alt=''/>}
            <div className='user'>Welcome { me.username }!</div>
            <Button
              type='primary'
              shape='round'
              onClick={async () => {
                await logout(setMe)
                message.success('Successfully logged out!')
              }}
            >
              Sign Out
            </Button>
          </>) : (<>
            <Link to={{ pathname: '/login' }}>
              <Button
                type="default"
                style={{ background: 'transparent', border: 'none' }}
              >
                Sign In
              </Button>
            </Link>
            <Link to={{ pathname: '/signup' }}>
              <Button type='primary' shape='round'>Sign Up</Button>
            </Link>
          </>)
        }

      </RightContainer>
    </Container>
  )
}

export default NavBar

import React from 'react'
import { Container, LeftContainer, Logo, RightContainer } from './NavBar.style'
import { Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { meState } from '../stores/me'
import { logout } from '../utils/fetch/fetchAPI'

const NavBar: React.FC = () => {
  const [me, setMe] = useRecoilState(meState)
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
            <div className='user'>Welcome { me }!</div>
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

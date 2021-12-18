import React from 'react'
import { CenterContainer, Container, LeftContainer, RightContainer } from './NavBar.style'
import { Button, message } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { meState } from '../stores/me'
import { logout } from '../utils/fetch/fetchAPI'

const NavBar: React.FC = () => {
  const [me, setMe] = useRecoilState(meState)
  return (
    <Container>
      <LeftContainer>
        <MenuOutlined />
      </LeftContainer>
      <CenterContainer>
        Boiler plate app
      </CenterContainer>
      <RightContainer>
        {me
          ? (
            <>
              <div className='user'>Welcome { me }!</div>
              <Button
                type="primary"
                shape="round"
                onClick={async () => {
                  await logout(setMe)
                  message.success('Successfully logged out!')
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
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
            </>
          )
        }

      </RightContainer>
    </Container>
  )
}

export default NavBar

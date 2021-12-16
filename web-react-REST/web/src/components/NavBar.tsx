import React from 'react'
import { CenterContainer, Container, LeftContainer, RightContainer } from './NavBar.style'
import { Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { meState } from '../stores/me'

const NavBar: React.FC = () => {
  const me = useRecoilValue(meState)
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
            <Button>
              Logout
            </Button>
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
                <Button type="primary" shape="round">Sign Up</Button>
              </Link>
            </>
          )
        }

      </RightContainer>
    </Container>
  )
}

export default NavBar

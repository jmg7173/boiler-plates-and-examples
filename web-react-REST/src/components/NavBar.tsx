import React from 'react'
import { Container, CenterContainer, RightContainer, LeftContainer } from './NavBar.style'
import { Button } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

const NavBar: React.FC = () => {
  return (
    <Container>
      <LeftContainer>
        <MenuOutlined />
      </LeftContainer>
      <CenterContainer>
        Boiler plate app
      </CenterContainer>
      <RightContainer>
        <Button>Sign Up</Button>
      </RightContainer>
    </Container>
  )
}

export default NavBar

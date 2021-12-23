import React from 'react'
import {
  Container,
  LeftContainer,
  Logo,
  MenuContainer,
  RightContainer,
} from './NavBar.style'
import { Avatar, Button, Dropdown, Menu, message } from 'antd'
import { Link } from 'react-router-dom'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { meState } from '../stores/me'
import { getEndpoint, logout } from '../utils/fetch/fetchAPI'
import { IUser } from '../interfaces/User'
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'

const menu = (user: IUser, setMe: SetterOrUpdater<IUser | null>) => {
  return (
    <MenuContainer>
      <Menu selectedKeys={[]}>
        <Menu.ItemGroup title={`Signed in as ${user.username}`} className='userInfo' />
        <Menu.Divider />
        <Menu.Item key='profile'>
          <UserOutlined /> Profile
        </Menu.Item>
        <Menu.Item key='setting'>
          <SettingOutlined /> Setting
        </Menu.Item>
        <Menu.Item
          key="signOut"
          onClick={() => {
            logout(setMe)
            message.success('Successfully logged out!')
          }}
        >
          <LogoutOutlined /> Sign Out
        </Menu.Item>

      </Menu>
    </MenuContainer>
  )
}

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
            <Dropdown
              overlay={menu(me, setMe)}
              trigger={['click']}
            >
              <Avatar
                size={40}
                src={getEndpoint() + me.profileImgPath}
                className='avatar'
              />
            </Dropdown>
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

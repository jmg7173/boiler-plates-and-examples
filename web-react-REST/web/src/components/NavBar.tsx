import React, { SetStateAction, useState } from 'react'
import {
  Container,
  LeftContainer,
  Logo,
  MenuContainer,
  RightContainer,
} from './NavBar.style'
import { Avatar, Badge, Button, Dropdown, Menu, message } from 'antd'
import { Link } from 'react-router-dom'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { meState } from '../stores/me'
import { getEndpoint, logout } from '../utils/fetch/fetchAPI'
import { IUser } from '../interfaces/User'
import {
  BellOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import ProfileModal from './modals/ProfileModal'

const menu = (
  user: IUser,
  setMe: SetterOrUpdater<IUser | null>,
  showModal: string | null,
  setShowModal: React.Dispatch<SetStateAction<string | null>>,
) => {
  return (
    <MenuContainer>
      <Menu
        selectedKeys={[]}
        onClick={(e) => {
          if (e.key !== 'signOut') {
            setShowModal(e.key)
          }
        }}
      >
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
      <ProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </MenuContainer>
  )
}

const NavBar: React.FC = () => {
  const [me, setMe] = useRecoilState(meState)
  const [showModal, setShowModal] = useState<string | null>(null)

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
            <Badge
              count={10}
              className='alarmBadge'
              offset={[4, 4]}
              overflowCount={9}
            >
              <BellOutlined style={{ fontSize: 25 }}/>
            </Badge>
            <Dropdown
              overlay={menu(me, setMe, showModal, setShowModal)}
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

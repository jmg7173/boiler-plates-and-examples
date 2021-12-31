import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Col, Dropdown, Form, Input, Menu, Modal, Row } from 'antd'
import { meState } from '../../stores/me'
import { useRecoilState } from 'recoil'
import { fetchAPI, getEndpoint, getMe } from '../../utils/fetch/fetchAPI'
import { ProfileContainer, ProfileImgContainer } from './ProfileModal.style'
import { CameraOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'
import { IUser } from '../../interfaces/User'

const profileUploadMenu = (
  setNewProfileImg: React.Dispatch<SetStateAction<any>>,
  uploadRef: React.RefObject<HTMLInputElement>,
) => {
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }
  const handleUploadChange = async (e: any) => {
    const newProfile = await getBase64(e.target.files[0])
    setNewProfileImg(newProfile)
    if (uploadRef && uploadRef.current) {
      uploadRef.current.value = ''
    }
  }
  const handleClick = (info: MenuInfo) => {
    if (info.key === 'uploadNew') {
      if (uploadRef && uploadRef.current) {
        uploadRef.current.click()
      }
    } else if (info.key === 'revertImage') {
      setNewProfileImg(null)
    }
  }
  return (
    <Menu onClick={handleClick}>
      <Menu.Item key='uploadNew'>
        <input
          type='file'
          alt=''
          hidden={true}
          ref={uploadRef}
          onChange={handleUploadChange}
          accept='img/*'
        />
        Upload profile image
      </Menu.Item>
      <Menu.Item key='revertImage'>Revert</Menu.Item>
    </Menu>
  )
}

interface IProfileUpdateForm {
  setIsEdit: React.Dispatch<SetStateAction<boolean>>
  setNewProfileImg: React.Dispatch<SetStateAction<any>>
  editErrorMessage: string
  handleSave: (values: any) => Promise<void>
  me: IUser
}
const ProfileUpdateForm: React.FC<IProfileUpdateForm> = ({
  setIsEdit,
  setNewProfileImg,
  editErrorMessage,
  handleSave,
  me,
}) => {
  return (<>
    <Form
      onFinish={handleSave}
      initialValues={{
        username: me.username,
        email: me.email,
      }}
    >
      {!!editErrorMessage && (
        <p className='errorMsg' style={{ color: 'red' }}>
          {editErrorMessage.split('\n').map((message: string) => {
            console.log(message)
            return (<>{ message }<br/></>)
          })}
        </p>
      )}
      Username
      <Form.Item
        name='username'
      >
        <Input
          name='Username'
          placeholder='Username'
        />
      </Form.Item>
      Email
      <Form.Item
        name='email'
        rules={[
          {
            message: 'Invalid email format!',
            type: 'email',
          },
        ]}
      >
        <Input
          name='email'
          placeholder='test@test.com'
        />
      </Form.Item>
      Password
      <Form.Item
        name='password'
        rules={[
          {
            message: 'Need more than 8 characters, ' +
              'mixed with upper, lower, numbers, specials(!@#$%^&*)!',
            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,100}$/,
          },
        ]}
      >
        <Input.Password
          name='password'
          placeholder='Password'
        />
      </Form.Item>
      Check password
      <Form.Item
        name='checkPassword'
        dependencies={['password']}
        rules={[
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if ((getFieldValue('password') && !value) || (!getFieldValue && value)) {
                return Promise.reject('Please put password if you want to modify it')
              }
              if (getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('Password and password checking are different!')
            },
          }),
        ]}
      >
        <Input.Password
          placeholder='Check password'
        />
      </Form.Item>
      <Form.Item
        name='button'
      >
        <div className='onEditButtonWrapper'>
          <Button
            type='primary'
            htmlType='submit'
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setIsEdit(false)
              setNewProfileImg(null)
            }}
          >
            Cancel
          </Button>
        </div>
      </Form.Item>
    </Form>
  </>)
}

interface IProfileModalProps {
  showModal: string | null
  setShowModal: React.Dispatch<SetStateAction<string | null>>
}
const ProfileModal: React.FC<IProfileModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const [me, setMe] = useRecoilState(meState)
  const ref = useRef<HTMLInputElement>(null)
  const [newProfileImg, setNewProfileImg] = useState(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [editErrorMessage, setEditErrorMessage] = useState<string>('')


  const handleCancel = () => setShowModal(null)
  const handleSave = async (values: any) => {
    const { username, email, password } = values
    try {
      const uri = `/users/${me!.id}`
      const data = {
        username: me!.username === username ? null : username,
        email: me!.email === email ? null : email,
        profileImg: newProfileImg,
        password: password,
      }
      if (!data.username && !data.email && !data.profileImg && !data.password) {
        setIsEdit(false)
        return
      }
      await fetchAPI(uri, 'put', data)
      const user = await getMe()
      setMe(() => {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          profileImgPath: user.profile_img_path,
        }
      })
      setNewProfileImg(null)
      setIsEdit(false)
    } catch (e: ResponseType | any) {
      if (e.status !== 400) {
        return
      }
      const errorResponse = await e.json()
      const {
        username: errorUsername,
        email: errorEmail,
      } = errorResponse.validation
      setEditErrorMessage([errorUsername, errorEmail].filter(x => x).join('\n'))
    }
  }

  useEffect(() => {
    setNewProfileImg(null)
    if (ref && ref.current) {
      ref.current.value = ''
    }
  }, [showModal])

  return (
    <>
      <Modal
        centered={true}
        visible={showModal === 'profile'}
        onCancel={handleCancel}
        footer={null}
        width={650}
      >
        <Row gutter={24}>
          <Col span={10}>
            <ProfileImgContainer>
              <Avatar
                size={200}
                src={newProfileImg || getEndpoint() + me!.profileImgPath}
              />
              {isEdit && <Dropdown.Button
                className="profileUploadButton"
                overlay={ profileUploadMenu(setNewProfileImg, ref) }
                icon={ <CameraOutlined /> }
              />}
            </ProfileImgContainer>
          </Col>
          <Col span={14}>
            <ProfileContainer>
              {isEdit
                ? <ProfileUpdateForm
                  setIsEdit={setIsEdit}
                  setNewProfileImg={setNewProfileImg}
                  editErrorMessage={editErrorMessage}
                  handleSave={handleSave}
                  me={me!}
                /> : (<>
                  <div className='userInfo'>
                    <UserOutlined /> {me!.username}
                  </div>
                  <div className='userInfo'>
                    <MailOutlined /> {me!.email}
                  </div>
                  <Button
                    className='editProfileButton'
                    onClick={() => {setIsEdit(true)}}
                  >
                    Edit Profile
                  </Button>
                </>)
              }
            </ProfileContainer>
          </Col>
        </Row>
      </Modal>
    </>
  )
}

export default ProfileModal

import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { Avatar, Dropdown, Menu, Modal } from 'antd'
import { meState } from '../../stores/me'
import { useRecoilValue } from 'recoil'
import { getEndpoint } from '../../utils/fetch/fetchAPI'
import { ProfileImgContainer } from './ProfileModal.style'
import { CameraOutlined } from '@ant-design/icons'
import { MenuInfo } from 'rc-menu/lib/interface'

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

interface IProfileModalProps {
  showModal: string | null
  setShowModal: React.Dispatch<SetStateAction<string | null>>
}
const ProfileModal: React.FC<IProfileModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const me = useRecoilValue(meState)
  const ref = useRef<HTMLInputElement>(null)
  const [newProfileImg, setNewProfileImg] = useState(null)
  const handleCancel = () => setShowModal(null)

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
      >
        <ProfileImgContainer>
          <Avatar
            size={200}
            src={newProfileImg || getEndpoint() + me!.profileImgPath}
          />
          <Dropdown.Button
            className='profileUploadButton'
            overlay={profileUploadMenu(setNewProfileImg, ref)}
            icon={<CameraOutlined />}
          />
        </ProfileImgContainer>
      </Modal>
    </>
  )
}

export default ProfileModal

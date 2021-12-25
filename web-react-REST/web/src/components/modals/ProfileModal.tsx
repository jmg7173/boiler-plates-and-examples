import React, { SetStateAction } from 'react'
import { Modal } from 'antd'

interface IProfileModalProps {
  showModal: string | null
  setShowModal: React.Dispatch<SetStateAction<string | null>>
}
const ProfileModal: React.FC<IProfileModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const handleCancel = () => setShowModal(null)
  return (
    <>
      <Modal
        centered={true}
        visible={showModal === 'profile'}
        onCancel={handleCancel}
      >
      </Modal>
    </>
  )
}

export default ProfileModal

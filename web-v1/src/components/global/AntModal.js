import React, { useState } from 'react'
import { Modal, Button } from 'antd'

export default function AntModal({ visible, loading, setVisible, setLoading }) {
  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setLoading(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Modal
        visible={visible}
        title="플레이리스트 추가하기"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            취소
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            신규 등록
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

import React from 'react'
import MyContainer from 'containers/auth/MyContainer'
import MyLayout from 'components/layout/MyLayout'
import LoginGuard from 'containers/auth/LoginGuard'

function MyPage() {
  return (
    <MyLayout>
      <LoginGuard />
      <MyContainer />
    </MyLayout>
  )
}

export default MyPage

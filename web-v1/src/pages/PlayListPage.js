import React from 'react'
import PlayListContainer from 'containers/paly/PlayListContainer'
import MyLayout from 'components/layout/MyLayout'
import LoginGuard from 'containers/auth/LoginGuard'

function PlayListPage() {
  return (
    <MyLayout>
      <LoginGuard />
      <PlayListContainer />
    </MyLayout>
  )
}

export default PlayListPage

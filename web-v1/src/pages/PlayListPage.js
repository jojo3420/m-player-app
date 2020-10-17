import React, { useState } from 'react'
import PlayListContainer from 'containers/playlist/PlayListContainer'
import PlayListFormContainer from 'containers/playlist/PlayListFormContainer'
import MyLayout from 'components/layout/MyLayout'
import AddPlayListBtn from 'components/playlist/AddPlayListBtn'
import LoginGuard from 'containers/auth/LoginGuard'

function PlayListPage() {
  const [formVisible, setFormVisible] = useState(false)

  return (
    <MyLayout>
      <LoginGuard />
      <AddPlayListBtn setFormVisible={setFormVisible} />
      {formVisible ? (
        <PlayListFormContainer setFormVisible={setFormVisible} />
      ) : (
        <PlayListContainer />
      )}
    </MyLayout>
  )
}

export default PlayListPage

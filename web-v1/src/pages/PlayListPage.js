import React from 'react'
import useTitle from 'lib/hooks/useTitle'
import PlayListContainer from 'containers/paly/PlayListContainer'
import MyLayout from 'components/layout/MyLayout'

function PlayListPage() {
  useTitle('플레이리스트')
  return (
    <MyLayout>
      <PlayListContainer />
    </MyLayout>
  )
}

export default PlayListPage

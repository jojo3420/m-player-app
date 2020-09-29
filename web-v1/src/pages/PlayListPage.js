import React from 'react'
import useTitle from 'lib/hooks/useTitle'
import PlayListContainer from 'containers/paly/PlayListContainer'

function PlayListPage() {
  useTitle('플레이리스트')
  return <PlayListContainer />
}

export default PlayListPage

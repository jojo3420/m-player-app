import React from 'react'
import PlayerContainer from 'containers/paly/PlayerContainer'
import useTitle from 'lib/hooks/useTitle'

function PlayerPage() {
  useTitle('Play')
  return <PlayerContainer />
}

export default PlayerPage

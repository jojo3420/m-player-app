import React from 'react'
import PlayerContainer from 'containers/palyer/PlayerContainer'
import useTitle from 'lib/hooks/useTitle'

function PlayerPage() {
  useTitle('Player')
  return <PlayerContainer />
}

export default PlayerPage

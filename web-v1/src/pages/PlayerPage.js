import React from 'react'
import PlayerContainer from 'containers/paly/PlayerContainer'
import useTitle from 'lib/hooks/useTitle'
import ErrorBoundary from 'components/global/ErrorBoundary'

function PlayerPage() {
  useTitle('Player')

  return (
    <ErrorBoundary>
      <PlayerContainer />
    </ErrorBoundary>
  )
}

export default PlayerPage

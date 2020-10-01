import React from 'react'
import PlayerContainer from 'containers/paly/PlayerContainer'
import useTitle from 'lib/hooks/useTitle'
import ErrorBoundary from 'components/global/ErrorBoundary'
import styled from 'styled-components'

function PlayerPage() {
  useTitle('Player')
  // bg image file ver.
  // document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("${thumbnail}") center no-repeat`
  document.body.style.background = `linear-gradient(rgba(145, 167, 255, 0.5), rgba(66, 99, 235, 0.8)) center no-repeat`
  document.body.style.backgroundSize = 'cover'

  return (
    <ErrorBoundary>
      <PlayerContainer />
    </ErrorBoundary>
  )
}

export default PlayerPage

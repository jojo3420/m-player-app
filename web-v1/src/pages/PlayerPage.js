import React from 'react'
import PlayerContainer from 'containers/paly/PlayerContainer'
import useTitle from 'lib/hooks/useTitle'
import MyLayout from 'components/layout/MyLayout'
import LoginGuard from 'containers/auth/LoginGuard'

function PlayerPage() {
  useTitle('Player')
  // bg image file ver.
  // document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("${thumbnail}") center no-repeat`
  // document.body.style.background = `linear-gradient(rgba(145, 167, 255, 0.5), rgba(66, 99, 235, 0.8)) center no-repeat`
  // document.body.style.backgroundSize = 'cover'

  return (
    <MyLayout>
      <LoginGuard />
      <PlayerContainer />
    </MyLayout>
  )
}

export default PlayerPage

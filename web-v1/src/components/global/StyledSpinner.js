import React from 'react'
import styled from 'styled-components'
import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave,
} from 'better-react-spinkit'
import palette from 'lib/styles/palette'

function StyledSpinner({ loading }) {
  if (!loading) return null

  return (
    <SpinnerBlock>
      <RotatingPlane size={100} color={palette.indigo[5]} />
    </SpinnerBlock>
  )
}

const SpinnerBlock = styled.div`
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //padding-top: 1rem;
  //padding-bottom: 1rem;
  position: absolute;
  left: 400px;
  top: 250px;
`

export default StyledSpinner

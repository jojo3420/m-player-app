import React from 'react'
import styled from 'styled-components'
import palette from 'lib/styles/palette'

const LinkElement = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
  }
  &:hover {
    color: ${palette.gray[9]};
  }
`

function StyledLink(props) {
  return (
    <>
      <LinkElement {...props} />
    </>
  )
}

export default StyledLink

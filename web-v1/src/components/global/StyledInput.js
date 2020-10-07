import React from 'react'
import styled from 'styled-components'
import palette from 'lib/styles/palette'

const Input = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: ${palette.gray[8]};
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`

function StyledInput(props) {
  return <Input {...props} />
}

export default StyledInput

import React from 'react'
import styled from 'styled-components'
import palette from 'lib/styles/palette'

const FormBlock = styled.div`
  h3 {
    color: ${palette.gray[8]};
    margin: 0 0 1.2rem;
    font-size: 1.3rem;
  }
`

function FormBlockWithTitle(props) {
  return <FormBlock {...props} />
}

export default FormBlockWithTitle

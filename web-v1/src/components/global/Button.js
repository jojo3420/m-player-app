import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import palette from 'lib/styles/palette'

/**
 * 공통 버튼
 * @param props
 *   fullWidth : boolean
 * @return {*}
 * @constructor
 */
function Button(props) {
  const { children, fullWidth } = props
  if (fullWidth) return <StyledButton {...props}>{children}</StyledButton>

  return <StyledLink {...props}>{children}</StyledLink>
}

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  ${(props) =>
    props['fullWidth'] &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.type === 'submit' &&
    css`
      background: ${props.color ? palette[props.color][5] : palette.gray[5]};
      &:hover {
        background: ${props.color ? palette[props.color][4] : palette.gray[4]};
      }
    `}
`

const StyledLink = styled(Link)`
  width: 200px;
  //color: red;
  color: ${palette.gray[8]};
  font-size: 1rem;
  padding: 0.25rem 1rem;
  color: ${(props) => (props.color ? props.color[5] : palette.gray[5])};
  &:hover {
    background: ${(props) =>
      props.color ? palette[props.color][4] : palette.gray[4]};
  }
`

export default Button

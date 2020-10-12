import React from 'react'
import styled from 'styled-components'
import palette from 'lib/styles/palette'
import { appName } from 'lib/constant'
import { Link } from 'react-router-dom'

function PageFooter(props) {
  return (
    <Footer>
      <address>
        <a href="mailto:haha-world@kakao.com">&copy; {appName.en}</a>
      </address>
      <a href="#header">맨위로 </a>
    </Footer>
  )
}

const Footer = styled.footer`
  background: ${palette.indigo[7]};
  width: 100%;
  height: 80px;
`
export default PageFooter

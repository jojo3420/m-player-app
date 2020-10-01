import React from 'react'
import styled from 'styled-components'
import palette from 'lib/styles/palette'
import { Link } from 'react-router-dom'
import { appInfo } from 'lib/constant'

/**
 * 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
 */
const AuthTemplateBlock = styled.div``
const WhiteBox = styled.div``

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <h1 className="logo">
          <strong>{appInfo.title}</strong>
        </h1>
        <Link to="/"></Link>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  )
}

export default AuthTemplate

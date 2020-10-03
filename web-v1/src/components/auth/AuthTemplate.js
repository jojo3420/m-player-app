import React from 'react'
import styled from 'styled-components'
import palette from 'lib/styles/palette'
import { Link } from 'react-router-dom'
import { appInfo } from 'lib/constant'

/**
 */
const AuthTemplateBlock = styled.div`
  //margin-top: 40px;
  //margin-bottom: 40px;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  /* flex 로 내부 내용 중앙 정렬 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const WhiteBox = styled.div`
  .sub-title {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1.25rem;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 380px;
  background: white;
  border-radius: 2px;
`

const AuthTemplate = ({ children }) => {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="sub-title">
          <Link to="/">{appInfo.title}</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  )
}

export default AuthTemplate

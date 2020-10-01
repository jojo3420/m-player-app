import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import palette from 'lib/styles/palette'
import Button from 'components/global/Button'

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */

const AuthFormBlock = styled.div``
const StyledInput = styled.input``
const Footer = styled.footer``

const AuthForm = ({
  type,
  email,
  username,
  pw1,
  pw2,
  mobile,
  smsNo,
  onChangeEmail,
  onSubmit,
  onSendSMS,
}) => {
  const title = type === 'signIn' ? '로그인' : '회원가입'
  return (
    <AuthFormBlock>
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          type="email"
          autoComplete="email"
          name="email"
          placeholder="email 입력"
          value={email}
          onChange={onChangeEmail}
        />
        <StyledInput
          type="password"
          value={pw1}
          name="pw1"
          placeholder="password 입력"
        />
        {title === '회원가입' && (
          <>
            <StyledInput
              type="password"
              value={pw2}
              name="pw2"
              placeholder="password 재입력"
              onChange={() => {}}
            />
            <StyledInput
              value={username}
              name="username"
              placeholder="username"
              onChange={() => {}}
            />
            <StyledInput
              type="tel"
              value={mobile}
              name="mobile"
              placeholder="모바일 번호 입력"
              onChange={() => {}}
            />
            <Button onClick={onSendSMS}>인증번호 전송</Button>
            <StyledInput
              type="number"
              value={smsNo}
              name="smsNo"
              placeholder="모바일 인증번호 입력"
              onChange={() => {}}
            />
          </>
        )}
        <Button type="submit" fullWidth>
          {title}
        </Button>
      </form>

      <Footer>
        <Link to={type === 'signIn' ? '/signup' : '/signin'}>
          {type === 'signIn' ? '회원가입 이동' : '로그인 이동'}
        </Link>
      </Footer>
    </AuthFormBlock>
  )
}

export default AuthForm

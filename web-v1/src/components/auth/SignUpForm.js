import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import palette from 'lib/styles/palette'
import Button from 'components/global/Button'
import CertificationInput from 'components/global/CertificationInput'

/**
 * 회원 가입 및 로그인 폼
 * @param props
 * @return {*}
 * @constructor
 */

export default function SignUpForm({
  step,
  isSend,
  member,
  onChange,
  onAvailableSubmit,
  onSignUpFinishSubmit,
  onSendSMS,
}) {
  const { email, username, pw1, pw2, mobile } = member
  const {
    onChangeEmail,
    onChangeUsername,
    onChangePw1,
    onChangePw2,
    onChangeMobile,
    onCompleteCertificationNo,
  } = onChange

  return (
    <AuthFormBlock>
      <h3>
        {step === 0
          ? '회원 가입'
          : step === 1 && isSend
          ? 'sms 인증 번호 확인'
          : '인증 번호 전송'}
      </h3>
      {step > 0 ? (
        <form onSubmit={isSend ? onSignUpFinishSubmit : onSendSMS}>
          {isSend ? (
            <CertificationInput
              placeholder={''}
              onComplete={onCompleteCertificationNo}
            />
          ) : (
            <StyledInput
              type="tel"
              name="mobile"
              value={mobile}
              autoComplete="on"
              onChange={onChangeMobile}
              placeholder={'휴대폰 번호 입력'}
              maxLength={13}
              required={true}
            />
          )}
          <ButtonWithMarginTop
            type="submit"
            fullWidth
            color={isSend ? 'indigo' : 'blue'}
          >
            {isSend ? '가입 완료' : 'SMS 전송'}
          </ButtonWithMarginTop>
        </form>
      ) : (
        <form onSubmit={onAvailableSubmit}>
          <StyledInput
            type="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            autoComplete="on"
            placeholder={'이메일 입력'}
            minLength={10}
            maxLength={40}
            required={true}
          />
          <StyledInput
            type="password"
            name="pw1"
            value={pw1}
            onChange={onChangePw1}
            autoComplete="off"
            placeholder={'암호 입력'}
            minLength={8}
            maxLength={20}
            required={true}
          />
          <StyledInput
            type="password"
            name="pw2"
            value={pw2}
            onChange={onChangePw2}
            autoComplete="off"
            placeholder={'암호 재 입력'}
            minLength={8}
            maxLength={20}
            required={true}
          />
          <StyledInput
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            placeholder={'닉네임 입력'}
            minLength={2}
            maxLength={5}
            required={true}
          />
          <ButtonWithMarginTop type="submit" fullWidth color="indigo">
            가입 하기
          </ButtonWithMarginTop>
          <StyledLink>
            <Link to="/signin">로그인</Link>
          </StyledLink>
        </form>
      )}
    </AuthFormBlock>
  )
}

const AuthFormBlock = styled.div`
  h3 {
    color: ${palette.gray[8]};
    margin: 0 0 1.2rem;
    font-size: 1.3rem;
  }
`

const StyledInput = styled.input`
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
  &::placeholder {
    // color: ${palette.red[6]};
  }
`
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1.5rem;
`

const StyledLink = styled.div`
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

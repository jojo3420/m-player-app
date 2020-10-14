import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import palette from 'lib/styles/palette'
import Button from 'components/global/Button'
import CertificationInput from 'components/global/CertificationInput'
import StyledInput from 'components/global/StyledInput'
import StyledLink from 'components/global/StyledLink'
import FormBlockWithTitle from 'components/global/FormBlockWithTitle'
import PropTypes from 'prop-types'

SignUpForm.propTypes = {
  step: PropTypes.bool,
  isSend: PropTypes.bool,
  member: PropTypes.object,
  onChange: PropTypes.object,
  onAvailableSubmit: PropTypes.func,
  onSignUpFinishSubmit: PropTypes.func,
  onSendSMS: PropTypes.func,
  onBlurMobile: PropTypes.func,
}
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
  onBlurMobile,
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
    <FormBlockWithTitle>
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
              placeholder={'ex) 010-1234-5678'}
              maxLength={13}
              required={true}
              onBlur={onBlurMobile}
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
            autoFocus
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
            maxLength={20}
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
    </FormBlockWithTitle>
  )
}

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1.5rem;
`

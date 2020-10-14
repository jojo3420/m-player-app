import React from 'react'
import useTitle from 'lib/hooks/useTitle'
import PropTypes from 'prop-types'
import Button from 'components/global/Button'
import StyledInput from 'components/global/StyledInput'

FindEmail.propTypes = {}

function FindEmail({ mobile, email, nextStep, handleMobile, onSubmit }) {
  useTitle('이메일 찾기')
  if (nextStep) {
    return email ? (
      <dl>
        <dt>이메일</dt>
        <dd>{email}</dd>
      </dl>
    ) : (
      <div>이메일 주소를 찾을 수 없습니다.</div>
    )
  }

  return (
    <fieldset>
      <legend>휴대폰 번호로 이메일 찾기</legend>
      <form onSubmit={onSubmit}>
        <StyledInput
          type="tel"
          onChange={handleMobile}
          value={mobile}
          name="mobile"
          placeholder="휴대폰 번호를 입력해 주세요."
          autoFocus
        />
        <Button type="submit" fullWidth color="indigo">
          확인
        </Button>
      </form>
    </fieldset>
  )
}

export default FindEmail

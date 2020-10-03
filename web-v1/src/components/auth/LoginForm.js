import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import palette from 'lib/styles/palette'
import Button from 'components/global/Button'

/**
 * 회원 가입 및 로그인 폼
 * @param props
 * @return {*}
 * @constructor
 */

function LoginForm({ register, errors, handleSubmit, onSubmit }) {
  return (
    <AuthFormBlock>
      <h3>로그인</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="email"
          // autoComplate="email"
          name="email"
          placeholder={errors.email ? '이메일 필수 입력' : '이메일 입력'}
          ref={register({ required: true })}
        />
        <StyledInput
          type="password"
          name="pw1"
          autoComplate="off"
          placeholder={errors.pw1 ? '암호 필수 입력' : '암호 입력'}
          ref={register({ required: true })}
        />
        <StyledCheckboxBlock>
          <label htmlFor="saveCheckbox">아이디 저장</label>
          <input type="checkbox" name="saveCheckbox" id="saveCheckbox" />
        </StyledCheckboxBlock>
        <StyledFindBlock>
          <Link to="/find/id">아이디 찾기 </Link>
          <span> | </span>
          <Link to="/find/pwd">비밀번호 찾기</Link>
        </StyledFindBlock>

        <ButtonWithMarginTop type="submit" fullWidth color="indigo">
          로그인 하기
        </ButtonWithMarginTop>
        <StyledLink>
          <Link to="/signup">회원 가입</Link>
        </StyledLink>
      </form>
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

const StyledCheckboxBlock = styled.div`
  label {
    display: inline-block;
    font-size: 1rem;
    margin: 0.5rem 0.3rem 0 0;
    text-align: left;
    cursor: pointer;
  }
  input:hover {
    cursor: pointer;
  }
`

const StyledFindBlock = styled.div`
  text-align: right;
  a {
    color: ${palette.gray[8]};
    text-decoration: none;
  }
  a:hover {
    color: ${palette.gray[6]};
  }
`

export default LoginForm

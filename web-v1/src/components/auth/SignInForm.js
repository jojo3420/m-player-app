import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import palette from 'lib/styles/palette'
import Button from 'components/global/Button'
import StyledInput from 'components/global/StyledInput'
import StyledLink from 'components/global/StyledLink'
import FormBlockWithTitle from 'components/global/FormBlockWithTitle'
import PropTypes from 'prop-types'

SignInForm.propTypes = {
  email: PropTypes.string,
  pw: PropTypes.string,
  handleField: PropTypes.func,
  onSubmit: PropTypes.func,
}
/**
 * 회원 가입 및 로그인 폼
 * @param props
 * @return {*}
 * @constructor
 */

function SignInForm({ email, pw, handleField, onSubmit }) {
  return (
    <FormBlockWithTitle>
      <h3>로그인</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          type="email"
          name="email"
          value={email}
          onChange={handleField}
          placeholder={'이메일 필수 입력'}
          autoComplate="on"
          autoFocus
        />
        <StyledInput
          type="password"
          name="pw"
          value={pw}
          onChange={handleField}
          autoComplate="off"
          placeholder={'암호 필수 입력'}
        />
        <StyledFindBlock>
          <Link to="/find/id">아이디 찾기 </Link>
          <span> | </span>
          <Link to="/find/pw">비밀번호 찾기</Link>
        </StyledFindBlock>
        <ButtonWithMarginTop type="submit" color="indigo" fullWidth>
          로그인 하기
        </ButtonWithMarginTop>
        <StyledLink>
          <Link to="/signup">회원 가입</Link>
        </StyledLink>
      </form>
    </FormBlockWithTitle>
  )
}

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1.5rem;
`

{
  /*<StyledCheckboxBlock>*/
}
{
  /*<label htmlFor="saveCheckbox">아이디 저장</label>*/
}
{
  /*<input type="checkbox" name="saveCheckbox" id="saveCheckbox" />*/
}
{
  /*</StyledCheckboxBlock>*/
}

// const StyledCheckboxBlock = styled.div`
//   label {
//     display: inline-block;
//     font-size: 1rem;
//     margin: 0.5rem 0.3rem 0 0;
//     text-align: left;
//     cursor: pointer;
//   }
//   input:hover {
//     cursor: pointer;
//   }
// `

const StyledFindBlock = styled.div`
  text-align: right;
  margin-top: 10px;
  a {
    color: ${palette.gray[8]};
    text-decoration: none;
  }
  a:hover {
    color: ${palette.gray[6]};
  }
`

export default SignInForm

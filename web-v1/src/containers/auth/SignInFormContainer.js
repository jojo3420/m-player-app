import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { onSignIn, onCheckLogin } from 'modules/auth'
import { message } from 'antd'
import { connect } from 'react-redux'
import AuthTemplate from 'components/auth/AuthTemplate'
import { bindActionCreators } from 'redux'
import SignInForm from 'components/auth/SignInForm'
import { validationEmail } from 'lib/validator'

function SignInFormContainer({ auth, signIn, check, onSignIn, onCheckLogin }) {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const onLoginSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (!email && !pw) return message.info('이메일 및 암호를 입력해주세요.')
      if (!validationEmail(email)) message.info('이메일 형식을 확인해주세요.')
      try {
        await onSignIn({ email, pw })
        await onCheckLogin()
        message.success('로그인 성공.')
      } catch (e) {
        console.error({ e })
      }
    },
    [email, pw, onSignIn, onCheckLogin],
  )

  // login error 처리
  useEffect(() => {
    if (signIn.status && signIn.status >= 400) {
      // console.log({ signIn })
      message.error(signIn.msg || '로그인이 실패 했습니다.')
    }
  }, [signIn])

  // login check ok
  useEffect(() => {
    const onLogin = async () => await onCheckLogin()
    onLogin()
  }, [])

  useEffect(() => {
    if (check.logged || auth) {
      history.push('/')
    }
  }, [check, auth])

  const handleField = useCallback((e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'pw') {
      setPw(value)
    }
  }, [])

  return (
    <AuthTemplate>
      <SignInForm
        email={email}
        pw={pw}
        handleField={handleField}
        onSubmit={onLoginSubmit}
      />
    </AuthTemplate>
  )
}

export default connect(
  ({ auth }) => {
    return {
      auth: auth.auth,
      signIn: auth.signIn,
      check: auth.check,
    }
  },
  (dispatch) => {
    return bindActionCreators(
      {
        onSignIn,
        onCheckLogin,
      },
      dispatch,
    )
  },
)(SignInFormContainer)

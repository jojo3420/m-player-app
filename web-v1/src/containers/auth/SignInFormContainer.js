import React, { useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { onSignIn, onCheckLogin } from 'modules/auth'
import { message } from 'antd'
import { connect } from 'react-redux'
import AuthTemplate from 'components/auth/AuthTemplate'
import { bindActionCreators } from 'redux'
import { useForm } from 'react-hook-form'
import LoginForm from 'components/auth/LoginForm'

function SignInFormContainer({ auth, signIn, check, onSignIn, onCheckLogin }) {
  const history = useHistory()
  const { register, errors, handleSubmit } = useForm()

  const onLoginSubmit = useCallback(
    async (formData) => {
      const { email, pw1 } = formData
      await onSignIn({ email, pw: pw1 })
      await onCheckLogin()
      message.success('로그인 성공.')
    },
    [onSignIn, onCheckLogin],
  )
  // login error 처리
  useEffect(() => {
    if (signIn.status && signIn.status >= 400) {
      console.log({ signIn })
      message.error(signIn.msg || '로그인이 실패 했습니다.')
    }
  }, [signIn])

  // login check ok
  useEffect(() => {
    if (check.logged) {
      console.log('login check ok.')
    }
  }, [check])

  useEffect(() => {
    if (auth) {
      try {
        localStorage.setItem('auth', JSON.stringify(auth))
      } catch (e) {
        console.log('로그인 로컬 스토리지 저장 실패.' + e)
      }
      history.push('/')
    }
  }, [auth])

  return (
    <AuthTemplate>
      <LoginForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
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

import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { onIsAvailable, onSignUp, onCheckLogin, sendSMS } from 'modules/auth'
import { message } from 'antd'
import AuthTemplate from 'components/auth/AuthTemplate'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import useTextInput from 'lib/hooks/useTextInput'
import SignUpForm from 'components/auth/SignUpForm'
import bcrypt from 'bcryptjs'

function SignUpFormContainer({
  auth,
  // signUp,
  // available,
  serverNo,
  check,
  onIsAvailable,
  onSignUp,
  onCheckLogin,
  sendSMS,
}) {
  const history = useHistory()
  const [email, onChangeEmail] = useTextInput('kkk@kkk.com')
  const [username, onChangeUsername] = useTextInput('sser')
  const [pw1, onChangePw1] = useTextInput('test1234')
  const [pw2, onChangePw2] = useTextInput('test1234')
  const [mobile, onChangeMobile] = useTextInput('01012341234')
  // const [serverNo, setServerNo] = useState('')
  const [certificationNo, setCertificationNo] = useState('')
  const [step, setStep] = useState(0)
  const [isSend, setIsSend] = useState(false)

  const onAvailableSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      if (pw1 !== pw2) return message.error('패스워드가 불일치 합니다.')
      try {
        await onIsAvailable({ email, pw: pw1 })
        setStep(1)
        setIsSend(false)
      } catch (error) {
        // console.log({ error })
        message.warn(
          (error && error.response.data.msg) || '회원 가입이 실패했습니다.',
        )
      }
    },
    [email, pw1, pw2],
  )
  const onSendSMS = useCallback(
    async (e) => {
      e.preventDefault()
      // @TODO - SMS SEND
      try {
        await sendSMS({ to: mobile, type: 'auth' })
        setIsSend(true)
      } catch (err) {
        console.log({ err })
        message.warning((err && err.response.data.msg) || '인증번호 전송 실패')
      }
    },
    [mobile],
  )

  const onCompleteCertificationNo = useCallback((values) => {
    // console.log({ values })
    setCertificationNo(values)
  }, [])

  const onSignUpFinishSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      // email, pw1,, username, mobile, certificationNo
      console.log({ serverNo, certificationNo })
      if (bcrypt.compare(certificationNo, serverNo)) {
        await onSignUp({ email, pw: pw1, username, mobile })
        await onCheckLogin()
        message.success('회원가입 성공!')
      } else {
        message.warning('인증번호가 일치하지 않습니다.')
      }
    },
    [email, pw1, username, mobile, serverNo, certificationNo, onSignUp],
  )

  // useEffect(() => {
  // if (signUp && signUp.status >= 400) {
  //   message.error(signUp.msg || '회원 가입이 실패했습니다.')
  // } else if (available && available.status === 403) {
  //   message.warning(available.msg || '이미 사용중인 회원 정보 입니다.')
  // }
  // return () => null
  // }, [signUp, available])

  // login check ok
  useEffect(() => {
    if (check.logged) {
      console.log('login check ok.')
    }
    return () => null
  }, [check])

  useEffect(() => {
    if (auth) {
      try {
        localStorage.setItem('auth', JSON.stringify(auth))
      } catch (e) {
        console.log('회원 가입 로컬 스토리지 저장 실패.' + e)
      }
      history.push('/')
    }
  }, [auth])

  return (
    <AuthTemplate>
      <SignUpForm
        step={step}
        isSend={isSend}
        member={{ email, username, pw1, pw2, mobile, certificationNo }}
        onChange={{
          onChangeEmail,
          onChangeUsername,
          onChangePw1,
          onChangePw2,
          onChangeMobile,
          onCompleteCertificationNo,
        }}
        onAvailableSubmit={onAvailableSubmit}
        onSignUpFinishSubmit={onSignUpFinishSubmit}
        onSendSMS={onSendSMS}
      />
    </AuthTemplate>
  )
}

export default connect(
  ({ auth }) => {
    return {
      auth: auth.auth,
      signUp: auth.signUp,
      check: auth.check,
      available: auth.available,
      serverNo: auth.sms.server,
    }
  },
  (dispatch) => {
    return bindActionCreators(
      {
        onIsAvailable,
        onSignUp,
        onCheckLogin,
        sendSMS,
      },
      dispatch,
    )
  },
)(SignUpFormContainer)

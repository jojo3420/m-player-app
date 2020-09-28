import React from 'react'
import LoginFormContainer from '../containers/auth/LoginFormContainer'
import useTitle from 'lib/hooks/useTitle'

function LoginPage({}) {
  useTitle('Login')
  return (
    <div>
      <LoginFormContainer />
    </div>
  )
}

export default LoginPage

import React from 'react'
import SignInFormContainer from 'containers/auth/SignInFormContainer'
import useTitle from 'lib/hooks/useTitle'

function SignInPage({}) {
  useTitle('Login')
  return (
    <div>
      <SignInFormContainer />
    </div>
  )
}

export default SignInPage

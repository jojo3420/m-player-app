import React from 'react'
import SignUpFormContainer from 'containers/auth/SignUpFormContainer'
import useTitle from 'lib/hooks/useTitle'

function SignUpPage(props) {
  useTitle('Sign up')
  return (
    <div>
      <SignUpFormContainer />
    </div>
  )
}

export default SignUpPage

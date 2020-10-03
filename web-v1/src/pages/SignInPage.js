import React from 'react'
import SignInFormContainer from 'containers/auth/SignInFormContainer'
import useTitle from 'lib/hooks/useTitle'
import ErrorBoundary from 'components/global/ErrorBoundary'

function SignInPage({}) {
  useTitle('Login')
  return (
    <ErrorBoundary>
      <SignInFormContainer />
    </ErrorBoundary>
  )
}

export default SignInPage

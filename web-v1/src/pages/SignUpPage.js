import React from 'react'
import SignUpFormContainer from 'containers/auth/SignUpFormContainer'
import useTitle from 'lib/hooks/useTitle'
import ErrorBoundary from 'components/global/ErrorBoundary'

function SignUpPage() {
  useTitle('Sign up')
  return (
    <ErrorBoundary>
      <SignUpFormContainer />
    </ErrorBoundary>
  )
}

export default SignUpPage

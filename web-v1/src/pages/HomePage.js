import React from 'react'
import useTitle from 'lib/hooks/useTitle'
import MyLayout from 'components/layout/MyLayout'
import Home from 'components/Home'
import LoginGuard from 'containers/auth/LoginGuard'

export default function HomePage() {
  useTitle('Home')

  return (
    <MyLayout>
      {/*<LoginGuard />*/}
      <Home />
    </MyLayout>
  )
}

import React from 'react'
import useTitle from 'lib/hooks/useTitle'
import MyLayout from 'components/layout/MyLayout'
import Home from 'components/Home'

export default function HomePage() {
  useTitle('Home')

  return (
    <MyLayout>
      <Home />
    </MyLayout>
  )
}

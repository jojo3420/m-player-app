import React from 'react'
import useTitle from 'lib/hooks/useTitle'
import MyLayout from 'components/layout/MyLayout'
import About from 'components/About'

export default function AboutPage() {
  useTitle('서비스 소개')

  return (
    <MyLayout>
      <About />
    </MyLayout>
  )
}

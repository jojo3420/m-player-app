import React from 'react'
import { useLocation } from 'react-router-dom'
import FindEmail from 'components/auth/FindEmail'
import FindPw from 'components/auth/FindPw'
import MyLayout from 'components/layout/MyLayout'

function FindAccountPage() {
  // const params = useParams()
  // console.log({ params })
  const { pathname } = useLocation()
  // console.log({ pathname })

  return (
    <MyLayout>{pathname === '/find/pw' ? <FindPw /> : <FindEmail />}</MyLayout>
  )
}

export default FindAccountPage

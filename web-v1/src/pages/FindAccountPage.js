import React from 'react'
import { useLocation } from 'react-router-dom'
import FindEmail from 'components/auth/FindEmail'
import FindPw from 'components/auth/FindPw'

function FindAccountPage() {
  // const params = useParams()
  // console.log({ params })
  const { pathname } = useLocation()
  console.log({ pathname })

  return <>{pathname === '/find/pw' ? <FindPw /> : <FindEmail />}</>
}

export default FindAccountPage

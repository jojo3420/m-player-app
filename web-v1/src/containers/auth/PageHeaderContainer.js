import React, { useCallback, useEffect, useMemo } from 'react'
import PageHeader from 'components/layout/PageHeader'
import { useSelector } from 'react-redux'
import useActions from 'lib/hooks/useActions'
import { onLogout, onCheckLogin } from 'modules/auth'
import { useHistory } from 'react-router-dom'

function PageHeaderContainer({}) {
  const history = useHistory()
  const { logged, auth } = useSelector(({ auth }) => {
    return {
      logged: auth.check.logged,
      auth: auth.auth,
    }
  })
  const [logout, checkLogin] = useActions([onLogout, onCheckLogin])

  useEffect(() => {
    const isLoginStatus = async () => await checkLogin()
    isLoginStatus()
  }, [])

  const username = useMemo(() => {
    // console.log({ auth })
    return (auth && auth.username) || ''
  }, [auth])

  const handleLogout = useCallback(
    async (e) => {
      e.preventDefault()
      await logout()
      history.push('/')
    },
    [logout],
  )

  return (
    <PageHeader
      logged={logged}
      username={username}
      handleLogout={handleLogout}
    />
  )
}

export default PageHeaderContainer

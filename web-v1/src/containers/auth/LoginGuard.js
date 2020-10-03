import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { onCheckLogin } from 'modules/auth'

function LoginGuard({ onCheckLogin }) {
  const history = useHistory()

  useEffect(() => {
    const check = async () => {
      try {
        await onCheckLogin()
      } catch (e) {
        message.info('로그인이 필요한 서비스 입니다.', 3)
        history.push('/signin')
      }
    }
    check()
  }, [])

  return <></>
}

export default connect(
  (store) => {
    return {
      // auth: auth.auth,
    }
  },
  (dispatch) =>
    bindActionCreators(
      {
        onCheckLogin,
      },
      dispatch,
    ),
)(LoginGuard)

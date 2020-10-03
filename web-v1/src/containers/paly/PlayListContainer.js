import React, { useEffect } from 'react'
import PlayList from 'components/play/PlayList'
import { onCheckLogin } from 'modules/auth'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { message } from 'antd'
import LoginGuard from 'containers/auth/LoginGuard'

function PlayListContainer({}) {
  return (
    <>
      <LoginGuard />
      <PlayList />
    </>
  )
}

export default connect(
  ({ auth }) => {
    return {
      auth: auth.auth,
    }
  },
  (dispatch) => bindActionCreators({}, dispatch),
)(PlayListContainer)

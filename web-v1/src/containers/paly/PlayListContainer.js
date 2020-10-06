import React, { useEffect } from 'react'
import PlayList from 'components/play/PlayList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { message } from 'antd'
import LoginGuard from 'containers/auth/LoginGuard'
import { getPlayListBy } from 'modules/playlist'

function PlayListContainer({ auth, playList, loadingPlayList, getPlayListBy }) {
  useEffect(() => {
    const fetch = async (email) => {
      await getPlayListBy(email)
    }
    auth && fetch(auth.email)
  }, [auth])
  return (
    <>
      <LoginGuard />
      <PlayList playList={playList} loading={loadingPlayList} />
    </>
  )
}

export default connect(
  ({ auth, playList, loading }) => {
    return {
      auth: auth.auth,
      playList: playList.list,
      loadingPlayList: loading['playlist/GET_PLAY_LIST_BY'],
    }
  },
  (dispatch) =>
    bindActionCreators(
      {
        getPlayListBy,
      },
      dispatch,
    ),
)(PlayListContainer)

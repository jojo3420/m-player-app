import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory, Link } from 'react-router-dom'
import { getPlayListBy, activeAlbum } from 'modules/playlist'
import PlayList from 'components/playlist/PlayList'
import PropTypes from 'prop-types'

PlayListContainer.propTypes = {
  auth: PropTypes.object,
  playList: PropTypes.array,
  loadingPlayList: PropTypes.bool,
  getPlayListBy: PropTypes.func,
}

function PlayListContainer({
  auth,
  playList,
  loadingPlayList,
  getPlayListBy,
  activeAlbum,
}) {
  const history = useHistory()
  const [page, setPage] = useState(1)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = useCallback(async () => {
    const windowInnerHeight = window.innerHeight
    const windowScrollY = window.scrollY
    const windowHeightTotal = windowInnerHeight + windowScrollY
    const mainOffsetHeight = document.querySelector('.root-section')
      .offsetHeight
    if (windowHeightTotal === mainOffsetHeight) {
      console.log('fetch')
      setPage((page) => page + 1)
    }
  }, [])

  useEffect(() => {
    const fetch = async (email, page) => {
      await getPlayListBy({ email, page })
    }
    auth && fetch(auth.email, page)
  }, [auth, page])

  const gotoDetail = useCallback((album) => {
    const { id } = album
    history.push(`/playlist/${id}`)
    activeAlbum(album)
  }, [])

  return (
    <PlayList
      playList={playList}
      loading={loadingPlayList}
      gotoDetail={gotoDetail}
    />
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
        activeAlbum,
      },
      dispatch,
    ),
)(PlayListContainer)

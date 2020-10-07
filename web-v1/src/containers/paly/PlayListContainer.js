import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react'
import PlayList from 'components/play/PlayList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginGuard from 'containers/auth/LoginGuard'
import { getPlayListBy, activeAlbum } from 'modules/playlist'
import { useHistory } from 'react-router-dom'
import PlayListForm from 'components/play/PlayListForm'
import StyledLink from 'components/global/StyledLink'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { message } from 'antd'
// import { useForm } from 'react-hook-form'

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
  const [formPageVisible, setFormPageVisible] = useState(false)
  // const { register, handleSubmit, watch, errors } = useForm()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = useCallback(async () => {
    const windowInnerHeight = window.innerHeight
    const windowScrollY = window.scrollY
    const windowHeightTotal = windowInnerHeight + windowScrollY
    const mainOffsetHeight = document.querySelector('main').offsetHeight
    if (windowHeightTotal === mainOffsetHeight) {
      // console.log('fetch')
      setPage((page) => page + 1)
    }
  }, [])

  useEffect(() => {
    const fetch = async (email, page) => {
      await getPlayListBy({ email, page })
    }
    auth && fetch(auth.email, page)
  }, [auth, page])

  const onCreatePlaylist = useCallback((e) => {
    e.preventDefault()
  }, [])

  const gotoDetail = useCallback((album) => {
    const { id } = album
    history.push(`/playlist/${id}`)
    activeAlbum(album)
  }, [])

  return (
    <>
      <LoginGuard />
      {formPageVisible ? (
        <PlayListForm
          form={{ title, description, file, setTitle, setDescription, setFile }}
          onSubmit={onCreatePlaylist}
          onCancel={() => setFormPageVisible(false)}
        />
      ) : (
        <>
          <div style={{ position: 'absolute', left: 5, top: 10 }}>
            <StyledLink
              onClick={() => setFormPageVisible((visible) => !visible)}
            >
              <Link to="#">신규 추가</Link>
            </StyledLink>
          </div>
          <PlayList
            playList={playList}
            loading={loadingPlayList}
            gotoDetail={gotoDetail}
          />
        </>
      )}
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
        activeAlbum,
      },
      dispatch,
    ),
)(PlayListContainer)

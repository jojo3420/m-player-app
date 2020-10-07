import React, { useEffect, useState, useCallback } from 'react'
import Album from 'components/play/Album'
import axios from 'axios'
import { message } from 'antd'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginGuard from 'containers/auth/LoginGuard'
import { getMediaByPlayListId } from 'modules/playlist'

function AlbumContainer({ album, getMediaByPlayListId }) {
  const params = useParams()
  const { id } = params

  const [mediaList, setMediaList] = useState(null)

  useEffect(() => {
    // console.log({ id })
    const fetchMedia = async () => {
      console.log({ id })
      await getMediaByPlayListId(id)
    }

    fetchMedia()
  }, [id])

  const [formField, setField] = useState({
    title: '',
    artist: '',
    genre: '',
  })
  const [files, setFiles] = useState([])
  const handleField = useCallback((e) => {
    const { name, value } = e && e.target
    console.log({ name, value })
    setField((item) => ({ ...item, [name]: value }))
  }, [])
  const handleAudios = useCallback((e) => {
    const { files } = e && e.target
    console.log({ files })
    const temp = []
    for (let i = 0; i < files.length; i++) {
      temp.push(files[i])
    }
    setFiles(temp)
  }, [])

  const onSubmitFileSave = useCallback(
    async (e) => {
      e.preventDefault()
      const formData = new FormData()
      let url = '/file/upload'
      if (files && files.length === 1) {
        formData.append('file', files[0])
      } else {
        console.log({ files })
        url = '/file/uploads'
        files.forEach((file, i) => {
          formData.append(`files`, file)
        })
      }
      try {
        const response = await axios({
          method: 'POST',
          url,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log({ response })
        message.success(`업로드 성공! ${response.data.cnt}`)
      } catch (error) {
        console.log({ error })
        message.error('upload 실패..')
      }
    },
    [files],
  )

  return (
    <>
      <LoginGuard />
      <Album
        album={album}
        formField={formField}
        handleField={handleField}
        handleAudios={handleAudios}
        onSubmitFileSave={onSubmitFileSave}
      />
    </>
  )
}
export default connect(
  ({ auth, playList }) => {
    return {
      auth: auth.auth,
      album: playList.album,
    }
  },
  (dispatch) =>
    bindActionCreators(
      {
        getMediaByPlayListId,
      },
      dispatch,
    ),
)(AlbumContainer)

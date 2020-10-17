import React, { useCallback, useState } from 'react'
import PlayListForm from 'components/playlist/PlayListForm'
import axios from 'axios'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

/**
 * 플레이리스트 추가 폼
 * @param setFormVisible: 해당 폼 가시성 변경 함수
 * @return {*}
 * @constructor
 */
function PlayListFormContainer({ setFormVisible }) {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)
  // const [newPlayListID, setNewPlayListID] = useState(null)
  const { email } = useSelector(({ auth }) => auth.auth)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    if (name === 'title') {
      setTitle(value)
    } else {
      setDescription(value)
    }
  }, [])

  const handleFile = useCallback((e) => {
    const file = e.target.files[0] || null
    file && setFile(file)
  }, [])

  const onCreatePlaylist = useCallback(
    async (e) => {
      e.preventDefault()
      console.log({ title, description, file })
      if (title && description) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('email', email)
        try {
          const response = await axios.post(
            'http://localhost:3000/playlist',
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            },
          )
          console.log({ response })
          const { data, status } = response
          if (status === 201) {
            message.success('플레이리스트 생성 완료.')
            // setNewPlayListID(data.playlist.id || null)

            // reset state
            onCancel()
            history.push(`/playlist/${data.playlist.id}`)
          }
        } catch (e) {
          console.log({ e })
          message.warn('플레이리스트 생성 실패!')
        }
      }
    },
    [title, description, file, email],
  )

  const onCancel = useCallback(() => {
    setFormVisible(false)
    setTitle('')
    setDescription('')
    setFile(null)
  }, [])

  return (
    <PlayListForm
      form={{ title, description, file }}
      handleChange={handleChange}
      handleFile={handleFile}
      onCreatePlaylist={onCreatePlaylist}
      onCancel={onCancel}
    />
  )
}

export default PlayListFormContainer

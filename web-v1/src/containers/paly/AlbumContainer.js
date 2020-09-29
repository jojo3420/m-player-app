import React, { useEffect, useState, useCallback } from 'react'
import Album from 'components/play/Album'
import axios from 'axios'
import { message } from 'antd'

export default function AlbumContainer() {
  const [formField, setField] = useState({
    title: '',
    artist: '',
    genre: '',
  })
  const [audios, setAudios] = useState([])
  const handleField = useCallback((e) => {
    const { name, value } = e && e.target
    console.log({ name, value })
    setField((item) => ({ ...item, [name]: value }))
  }, [])
  const handleAudios = useCallback((e) => {
    const { files } = e && e.target
    // console.log({ files })
    setAudios(files)
  }, [])

  const onSubmitFileSave = useCallback(
    async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('file', audios)
      try {
        const response = await axios.post('/v1/upload', formData)
        message.success(response)
      } catch (error) {
        console.log({ error })
        message.error('upload 실패..')
      }
    },
    [audios],
  )

  return (
    <Album
      formField={formField}
      audios={audios}
      handleField={handleField}
      handleAudios={handleAudios}
      onSubmitFileSave={onSubmitFileSave}
    />
  )
}

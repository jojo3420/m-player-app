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
      let url = '/upload/single'
      if (files && files.length === 1) {
        formData.append('file', files[0])
      } else {
        console.log({ files })
        url = '/upload/array'
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
    <Album
      formField={formField}
      handleField={handleField}
      handleAudios={handleAudios}
      onSubmitFileSave={onSubmitFileSave}
    />
  )
}

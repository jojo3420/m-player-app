import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function UseFetch(url) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    try {
      const response = await axios.get(url)
      setData(response.data)
    } catch (e) {
      console.log({ e })
      setError(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetch()
  }, [])

  return [data, loading, error]
}

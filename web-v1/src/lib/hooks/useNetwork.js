import React, { useState, useEffect } from 'react'

export default function useNetwork(callback) {
  const [networkStatus, setStatus] = useState(navigator.onLine)

  const onChangeStatus = () => {
    const status = navigator.onLine

    if (typeof callback === 'function') {
      callback(status)
    }
    setStatus(status)
  }

  useEffect(() => {
    registerEventListener(onChangeStatus)

    // componentUnMount.
    return () => deleteEventListener(onChangeStatus)
  }, [])

  return networkStatus
}

function registerEventListener(onChangeStatus) {
  window.addEventListener('online', onChangeStatus)
  window.addEventListener('offline', onChangeStatus)
}

function deleteEventListener(onChangeStatus) {
  window.removeEventListener('online', onChangeStatus)
  window.removeEventListener('offline', onChangeStatus)
}

import React, { useRef, useEffect } from 'react'

function useFullScreen() {
  const ref = useRef()

  const openFullscreen = (callback) => {
    if (ref.current) {
      ref.current.requestFullscreen().catch((err) => {
        const { message, name } = err
        alert('fullscreenmode error: ' + message + ', ' + name)
      })
      if (callback && typeof callback === 'function') {
        callback(true)
      }
    }
  }

  const exitFullscreen = (callback) => {
    if (ref.current) {
      document.exitFullscreen().catch((err) => {
        const { message, name } = err
        console.error('fullscreenmode error: ' + message + ', ' + name)
      })
      if (callback && typeof callback === 'function') {
        callback(false)
      }
    }
  }

  return { ref, openFullscreen, exitFullscreen }
}

export default useFullScreen

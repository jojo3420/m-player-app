import React, { useEffect } from 'react'

function useScreenLeave(callback) {
  if (!callback || typeof callback !== 'function') {
    throw new Error('callback function is not working....')
  }

  const listener = (event) => {
    console.log(event)
    callback()
  }

  useEffect(() => {
    document.addEventListener('mouseleave', listener)

    // componentUnMount timing
    return () => document.removeEventListener('mouseleave', listener)
  }, [])
}

export default useScreenLeave

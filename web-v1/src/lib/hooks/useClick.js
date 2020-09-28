import React, { useRef, useEffect } from 'react'

export default function useClick(callback) {
  if (!callback) throw new Error('callback function is null')

  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('click', callback)
    }

    // componentUnMount
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('click', callback)
      }
    }
  }, [])

  return ref
}

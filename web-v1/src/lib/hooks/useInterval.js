import React, { useState, useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
  const savedCallbackRef = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallbackRef.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    const tick = () => {
      savedCallbackRef.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)

      //clean up
      return () => window.clearInterval(id)
    }
  }, [delay])
}

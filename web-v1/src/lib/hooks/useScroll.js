import React, { useState, useEffect } from 'react'

function useScroll() {
  const [screenPosition, setScreenPosition] = useState({
    scrollX: 0,
    scrollY: 0,
  })

  const listener = () => {
    console.log(`x: ${window.scrollX}, y: ${window.scrollY}`)
    setScreenPosition({ scrollX: window.scrollX, scrollY: window.scrollY })
  }
  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [])

  return screenPosition
}

export default useScroll

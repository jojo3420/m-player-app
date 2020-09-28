import React, { useRef, useEffect } from 'react'

/**
 * CSS style Fade In 효과를 element 참조할 ref 를 리턴 한다.
 * @param duration: 지속 시간(초)
 * @param delay: 지체 시간(초)
 * @returns {{ref: React.MutableRefObject<undefined>, style: {opacity: number}}}
 */
function useFadeIn(duration = 1, delay = 0) {
  if (typeof duration !== 'number' || typeof delay !== 'number') {
    throw new Error(`duration or delay is not number => ${duration}, ${delay}`)
  }

  const ref = useRef()
  const style = {
    opacity: 0,
  }

  useEffect(() => {
    if (ref.current) {
      const { current } = ref
      // style effect
      current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`
      current.style.opacity = 1
    }
  }, [])

  return {
    ref,
    style,
  }
}

export default useFadeIn

import React, { useState, useEffect } from 'react'

function useTitle(initialTitle) {
  const [title, setTitle] = useState(initialTitle)

  useEffect(() => {
    // html > head > title
    const titleElement = document.querySelector('title')
    titleElement.innerText = title
  }, [title])

  return setTitle
}

export default useTitle

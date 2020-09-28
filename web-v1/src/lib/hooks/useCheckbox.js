import React, { useState } from 'react'

export default function useCheckbox(initialState = {}) {
  const [state, setState] = useState(initialState)

  const onChange = (e) => {
    if (e && e.target) {
      const { name, checked } = e.target
      console.log({ name, checked })
      setState({ ...state, [name]: checked })
    } else if (typeof e === 'boolean') {
      // e 가 이벤트 객체가 아닐 경우
      setState(e)
    } else if (typeof e === 'object') {
      setState({ ...state, ...e })
    }
  }

  const onReset = () => {
    setState(initialState)
  }

  return [state, onChange, onReset]
}

import React, { useState, useCallback } from 'react'

export default function _useState(initialState = {}, validateFn, deps = []) {
  const [state, setState] = useState(initialState)

  const onChangeState = useCallback(
    (e) => {
      let update = true
      if (typeof validateFn === 'function') {
        update = validateFn(state)
      }
      let name, value
      if (e && e.target) {
        name = e.target.name
        value = e.target.value
        // console.log({ name, value });
        update && setState((state) => ({ ...state, [name]: value }))
      } else {
        // event 객체가 아닌 경우
        // console.log({ e });
        update && setState((state) => ({ ...state, ...e }))
      }
    },
    deps ? deps : [],
  )

  const onResetState = () => setState(initialState)

  return [state, onChangeState, onResetState]
}

import React, { useState, useCallback } from 'react'

/**
 * useTextInput 구현체 with useState
 * @param initialValue: 초기값
 * @param validator: validator function
 * @returns {[ value, onChange, onReset ]}
 */
export default function useTextInput(initialValue, validator) {
  const [value, setValue] = useState(initialValue)

  const onChange = (e) => {
    let value
    if (e && e.target) {
      value = e.target.value
    } else {
      value = e
    }
    let willUpdate = true
    if (typeof validator === 'function') {
      willUpdate = validator(value)
    }
    willUpdate && setValue(value)
  }

  const onReset = useCallback(() => {
    setValue(initialValue)
  }, [])

  return [value, onChange, onReset]
}

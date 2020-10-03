import React, { Component } from 'react'
import ReactCodeInput from 'react-verification-code-input'

export default class CertificationInput extends Component {
  render() {
    const { placeholder, onComplete } = this.props

    return (
      <ReactCodeInput
        fieldWidth={53}
        fieldHeight={53}
        autoFocus={true}
        placeholder={placeholder}
        onComplete={onComplete}
      />
    )
  }
}

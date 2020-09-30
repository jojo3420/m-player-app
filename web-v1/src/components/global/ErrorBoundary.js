import React from 'react'
import { withRouter } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo })
    console.log({ error, errorInfo })
  }

  render() {
    const { children, history } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <div>
          장애가 발생하였습니다. 관리자에게 문의 부탁드립니다.
          <button onClick={() => history.push('/')}>홈으로 이동</button>
        </div>
      )
    }

    return <>{children}</>
  }
}

export default withRouter(ErrorBoundary)

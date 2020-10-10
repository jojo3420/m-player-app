import React from 'react'
import PropTypes from 'prop-types'
import useTitle from 'lib/hooks/useTitle'

My.propTypes = {}

function My({}) {
  useTitle('My')

  return <div>My</div>
}

export default My

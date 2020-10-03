import React from 'react'
import PropTypes from 'prop-types'

PlayList.propTypes = {
  list: PropTypes.array.isRequired,
}

function PlayList({ list }) {
  return <div>playlist</div>
}

export default PlayList

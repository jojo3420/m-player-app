import React from 'react'
import StyledLink from 'components/global/StyledLink'
import { Link } from 'react-router-dom'

function AddPlayListBtn({ setFormVisible }) {
  return (
    <div>
      <StyledLink onClick={() => setFormVisible((visible) => !visible)}>
        <Link to="#">신규 추가</Link>
      </StyledLink>
    </div>
  )
}

export default AddPlayListBtn

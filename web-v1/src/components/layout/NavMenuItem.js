import React from 'react'
import StyledLink from 'components/global/StyledLink'
import { Link } from 'react-router-dom'

/**
 *  Menu Link Item component
 */
function NavMenuItem({ to, label, handleClick }) {
  return (
    <li>
      <StyledLink>
        <Link to={to} onClick={handleClick}>
          {label}
        </Link>
      </StyledLink>
    </li>
  )
}

export default NavMenuItem

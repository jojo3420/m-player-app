import React from 'react'
// import Button from 'components/global/Button'
import StyledLink from 'components/global/StyledLink'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import palette from 'lib/styles/palette'
import PropTypes from 'prop-types'

/**
 * Header Component
 * @constructor
 */
PageHeader.propTypes = {
  logged: PropTypes.bool,
  username: PropTypes.string,
  handleLogout: PropTypes.func,
}
function PageHeader({ logged, username, handleLogout }) {
  let Items
  if (logged) {
    Items = (
      <Menu>
        <MenuItem to="/" label="Home" />
        <MenuItem to="/playlist" label="PlayList" />
        <MenuItem to="/my" label="My" />
        <MenuItem handleClick={handleLogout} label="로그아웃" />
      </Menu>
    )
  } else {
    Items = (
      <Menu>
        <MenuItem to="/" label="Home" />
        <MenuItem to="/signin" label="로그인" />
        <MenuItem to="/signup" label="회원가입" />
      </Menu>
    )
  }

  return (
    <Header id="header">
      <nav>{Items}</nav>
      <div className="user-name">{username}</div>
    </Header>
  )
}

/**
 *  Menu Link Item component
 */
const MenuItem = ({ to, label, handleClick }) => {
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

const Header = styled.header`
  width: 100%;
  height: 6.25rem; /* 100px; */
  //background: ${palette.indigo[5]};
  .user-name {
    color: gray;
  }
`
const Menu = styled.ul`
  width: 100%;
  height: 100%;
  li {
    display: inline-block;
    //width: 100%;
    width: 80px;
    padding: 10px;

    background: ${palette.gray[4]};
    &:hover {
      background: ${palette.gray[5]};
    }
    a {
      text-decoration: none;
      transition: color 0.2s linear;
      color: ${palette.indigo[5]};
      &:hover {
        color: ${palette.indigo[6]};
      }
      &:visited {
        color: ${palette.indigo[5]};
      }
    }
  }
`

export default PageHeader

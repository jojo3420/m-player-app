import React from 'react'
import styled from 'styled-components'
import palette from 'lib/styles/palette'
import PropTypes from 'prop-types'
import DriveInfo from 'components/global/DriveInfo'
import NavMenuItem from 'components/layout/NavMenuItem'

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
        <NavMenuItem to="/" label="Home" />
        <NavMenuItem to="/playlist" label="PlayList" />
        <NavMenuItem to="/my" label="My" />
        <NavMenuItem handleClick={handleLogout} label="로그아웃" />
      </Menu>
    )
  } else {
    Items = (
      <Menu>
        <NavMenuItem to="/" label="Home" />
        <NavMenuItem to="/signin" label="로그인" />
        <NavMenuItem to="/signup" label="회원가입" />
      </Menu>
    )
  }

  return (
    <Header id="header">
      <DriveInfo />
      <div className="user-name">{username}</div>
      <nav>{Items}</nav>
    </Header>
  )
}

const Header = styled.header`
  border: 3px solid gray;
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
    //float: left;
    display: inline-block;
    //width: 100%;
    width: 100px;
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

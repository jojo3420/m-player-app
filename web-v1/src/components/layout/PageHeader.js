import React from 'react'
// import Button from 'components/global/Button'
import StyledLink from 'components/global/StyledLink'
import { Link } from 'react-router-dom'

function PageHeader({ logged, username, handleLogout }) {
  return (
    <header>
      <div>{username}</div>
      <nav>
        <ul>
          <li>
            {logged ? (
              <StyledLink>
                <Link onClick={handleLogout}>로그아웃</Link>
              </StyledLink>
            ) : (
              <StyledLink>
                <Link to={'/signin'}>로그인</Link>
              </StyledLink>
            )}
          </li>

          <li>
            {logged ? (
              <StyledLink>
                <Link to={'/my'}>MY</Link>
              </StyledLink>
            ) : (
              <StyledLink>
                <Link to={'/signup'}>회원가입</Link>
              </StyledLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default PageHeader
